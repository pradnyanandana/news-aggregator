<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{
    /**
     * Get News
     */
    public function getNews()
    {
        try {
            $user = auth('sanctum')->user();
            $preferences = [];

            if ($user) {
                $preferences = User::where('id', $user->id)->first()->preferences;
                $preferences = $preferences ? unserialize($preferences) : [];
            }

            $news = array_merge(
                $this->getNewsApi($preferences),
                $this->getNewYorkTimes($preferences),
                $this->getTheGuardian($preferences)
            );

            usort($news, function ($a, $b) {
                return $a['published_at'] <=> $b['published_at'];
            });

            if (isset($preferences['authors']) && is_array($preferences['authors']) && count($preferences['authors']) > 0) {
                $news = array_filter(
                    $news,
                    function ($v, $k) use ($preferences) {
                        return in_array($v['author'], $preferences['authors']);
                    },
                    ARRAY_FILTER_USE_BOTH
                );
            }

            return response()->json([
                'status' => true,
                'message' => $news
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Get News By Category
     * 
     * @param Request $request
     */
    public function getNewsByCategory(Request $request)
    {
        try {
            $category = $request->category;

            $news =  $this->getNewsApi(array(
                'type' => 'category',
                'category' => $category
            ));

            usort($news, function ($a, $b) {
                return $a['published_at'] <=> $b['published_at'];
            });

            return response()->json([
                'status' => true,
                'cat' => $category,
                'message' => $news,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Get News By Search
     * 
     * @param Request $request
     */
    public function getNewsSearch(Request $request)
    {
        try {
            $user = auth('sanctum')->user();
            $preferences = [];

            if ($user) {
                $preferences = User::where('id', $user->id)->first()->preferences;
                $preferences = $preferences ? unserialize($preferences) : [];
            }

            $validateSearch = Validator::make(
                $request->all(),
                [
                    'search' => 'required|string',
                    'begin_date' => 'nullable|date_format:Y-m-d H:i:s',
                    'end_date' => 'nullable|date_format:Y-m-d H:i:s',
                    'categories' => 'nullable|array',
                    'sources' => 'nullable|array'
                ]
            );

            if ($validateSearch->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateSearch->errors()
                ], 401);
            }

            $search = $request->all();

            $news = array_merge(
                $this->getNewsApi($search),
                $this->getNewYorkTimes($search),
                $this->getTheGuardian($search)
            );

            usort($news, function ($a, $b) {
                return $a['published_at'] <=> $b['published_at'];
            });

            return response()->json([
                'status' => true,
                'message' => $news
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Get News Api
     * 
     * @param array Param
     */
    public function getNewsApi($param = [])
    {
        $news = [];
        $sources = 'bleacher-report,bloomberg,business-insider,buzzfeed,crypto-coins-news,engadget,entertainment-weekly,espn,espn-cric-info,fortune,fox-sports,hacker-news,ign,mashable,mtv-news,nfl-news,nhl-news,polygon,recode,techcrunch,techradar,the-next-web,the-verge,the-wall-street-journal,wired,medical-news-today,national-geographic,new-scientist,next-big-future';

        if (isset($param['category'])) {
            switch ($param['category']) {
                case 'business':
                    $sources = 'bloomberg,business-insider,fortune,the-wall-street-journal';
                    break;
                case 'entertainment':
                    $sources = 'buzzfeed,entertainment-weekly,ign,mashable,mtv-news,polygon';
                    break;
                case 'tech':
                    $sources = 'crypto-coins-news,engadget,hacker-news,recode,techcrunch,techradar,the-next-web,the-verge,wired';
                    break;
                case 'sport':
                    $sources = 'bleacher-report,espn,espn-cric-info,fox-sports,nfl-news,nhl-news';
                    break;
                case 'science':
                    $sources = 'national-geographic,new-scientist,next-big-future';
                    break;
                case 'health':
                    $sources = 'medical-news-today';
                    break;
            }
        }

        if (isset($param['sources']) && is_array($param['sources'])) {
            $sources = implode(',', $param['sources']);
        }

        try {
            $response = Http::withUrlParameters([
                'endpoint' => "https://newsapi.org/v2/top-headlines",
                'apiKey' => env('NEWS_API', ''),
                'pageSize' => 100,
                'language' => 'en',
                'q' => isset($param['search']) ? urlencode($param['search']) : '',
                'searchIn' => isset($param['search']) ? 'title' : '',
                'from' => isset($param['begin-date']) ? $param['begin-date'] : '',
                'to' => isset($param['end-date']) ? $param['end-date'] : '',
                'sources' => $sources
            ])->get('{+endpoint}?sources={sources}&pageSize={pageSize}&apiKey={apiKey}&q={q}&from={from}&to={to}&language={language}&searchIn={searchIn}');

            if ($response->ok()) {
                $response = $response->json();

                if (isset($response['articles']) && is_array($response['articles'])) {
                    foreach ($response['articles'] as $article) {
                        $category = '';

                        switch ($article['source']['id']) {
                            case 'bloomberg':
                            case 'business-insider':
                            case 'fortune':
                            case 'the-wall-street-journal':
                                $category = 'business';
                                break;
                            case 'buzzfeed':
                            case 'entertainment-weekly':
                            case 'ign':
                            case 'mashable':
                            case 'mtv-news':
                            case 'polygon':
                                $category = 'entertainment';
                                break;
                            case 'crypto-coins-news':
                            case 'engadget':
                            case 'hacker-news':
                            case 'recode';
                            case 'techcrunch':
                            case 'techradar':
                            case 'the-next-web':
                            case 'the-verge':
                            case 'wired':
                                $category = 'tech';
                                break;
                            case 'bleacher-report':
                            case 'espn':
                            case 'espn-cric-info':
                            case 'fox-sports':
                            case 'nfl-news':
                            case 'nhl-news':
                                $category = 'sport';
                                break;
                            case 'medical-news-today':
                                $category = 'health';
                                break;
                            case 'national-geographic':
                            case 'new-scientist':
                            case 'next-big-future':
                                $category = 'science';
                                break;
                        }

                        array_push(
                            $news,
                            array(
                                'title' => $article['title'],
                                'excerpt' => $article['description'],
                                'author' => $article['author'],
                                'source' => $article['source']['name'],
                                'url' => $article['url'],
                                'image' => $article['urlToImage'],
                                'category' => $category,
                                'published_at' => strtotime($article['publishedAt']) * 1000,
                            )
                        );
                    }
                }
            }
        } catch (\Throwable $th) {
        }

        return $news;
    }

    /**
     * Get New York Times
     */
    public function getNewYorkTimes($param = [])
    {
        $news = [];

        try {
            if ((!$param['sources'] || in_array('new-york-times', $param['sources'])) && empty($param['category']) && empty($param['categories'])) {
                $response = Http::withUrlParameters([
                    'endpoint' => 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
                    'apiKey' => env('NEW_YORK_TIMES_API', ''),
                    'q' => isset($param['search']) ? urlencode($param['search']) : '',
                    'from' => isset($param['begin-date']) ? $param['begin-date'] : '',
                    'to' => isset($param['end-date']) ? $param['end-date'] : '',
                ])->get('{+endpoint}?api-key={apiKey}&q={q}');

                if ($response->ok()) {
                    $response = $response->json();

                    if (isset($response['response']) && is_array($response['response']) && isset($response['response']['docs']) && is_array($response['response']['docs'])) {
                        foreach ($response['response']['docs'] as $article) {
                            $image = count($article['multimedia']) > 0 ? $article['multimedia'][0] : false;
                            $person = count($article['byline']['person']) > 0 ? $article['byline']['person'][0] : false;

                            array_push(
                                $news,
                                array(
                                    'title' => $article['headline']['main'],
                                    'excerpt' => $article['abstract'],
                                    'author' => $person ? "{$person['firstname']} {$person['lastname']}" : '',
                                    'source' => $article['source'],
                                    'url' => $article['web_url'],
                                    'image' => $image ?  "https://www.nytimes.com/{$article['multimedia'][0]['url']}" : '',
                                    'published_at' => strtotime($article['pub_date']) * 1000,
                                )
                            );
                        }
                    }
                }
            }
        } catch (\Throwable $th) {
        }

        return $news;
    }

    /**
     * Get The Guardian
     */
    public function getTheGuardian($param = [])
    {
        $news = [];

        try {
            if ((!$param['sources'] || in_array('the-guardian', $param['sources'])) && empty($param['category']) && empty($param['categories'])) {
                $response = Http::withUrlParameters([
                    'endpoint' => 'https://content.guardianapis.com/search',
                    'apiKey' => env('THE_GUARDIAN_KEY', ''),
                    'q' => isset($param['search']) ? urlencode($param['search']) : '',
                    'from' => isset($param['begin-date']) ? $param['begin-date'] : '',
                    'to' => isset($param['end-date']) ? $param['end-date'] : '',
                ])->get('{+endpoint}?api-key={apiKey}&q={q}&from-date={from}&to-date={to}');

                if ($response->ok()) {
                    $response = $response->json();

                    if (isset($response['response']) && is_array($response['response']) && isset($response['response']['results']) && is_array($response['response']['results'])) {
                        foreach ($response['response']['results'] as $article) {
                            array_push(
                                $news,
                                array(
                                    'title' => $article['webTitle'],
                                    'excerpt' => $article['webTitle'],
                                    'author' => '',
                                    'source' => 'The Guardian',
                                    'webUrl' => $article['webUrl'],
                                    'image' => '',
                                    'published_at' => strtotime($article['webPublicationDate']) * 1000,
                                )
                            );
                        }
                    }
                }
            }
        } catch (\Throwable $th) {
        }

        return $news;
    }
}
