<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NewsController extends Controller
{
    /**
     * Get News
     */
    public function getNews()
    {
        try {
            $news = array_merge(
                $this->getNewsApi(),
                $this->getNewYorkTimes(),
                $this->getTheGuardian()
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
     * Get News
     * 
     * @param Request $request
     */
    public function getNewsByCategory(Request $request)
    {
        try {
            $category = $request->route('category');

            $news =  $this->getNewsApi(array(
                'category' => $category
            ));

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

        $response = Http::withUrlParameters([
            'endpoint' => 'https://newsapi.org/v2/top-headlines',
            'apiKey' => env('NEWS_API', ''),
            'pageSize' => 100,
            'sources' => isset($param['category']) ? '' : 'bleacher-report,bloomberg,business-insider,buzzfeed,crypto-coins-news,engadget,entertainment-weekly,espn,espn-cric-info,fortune,fox-sports,hacker-news,ign,mashable,mtv-news,nfl-news,nhl-news,polygon,recode,techcrunch,techradar,the-next-web,the-verge,the-wall-street-journal,wired,medical-news-today,national-geographic,new-scientist,next-big-future',
            'country' => isset($param['category']) ? 'us' : '',
            'category' => isset($param['category']) ? $param['category'] : ''
        ])->get('{+endpoint}?sources={sources}&pageSize={pageSize}&category={category}&country{country}&apiKey={apiKey}');

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
                            'published_at' => strtotime($article['publishedAt']),
                        )
                    );
                }
            }
        }

        return $news;
    }

    /**
     * Get New York Times
     */
    public function getNewYorkTimes()
    {
        $news = [];

        $response = Http::withUrlParameters([
            'endpoint' => 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
            'apiKey' => env('NEW_YORK_TIMES_API', ''),
        ])->get('{+endpoint}?api-key={apiKey}');

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
                            'published_at' => strtotime($article['pub_date']),
                        )
                    );
                }
            }
        }

        return $news;
    }

    /**
     * Get The Guardian
     */
    public function getTheGuardian()
    {
        $news = [];

        $response = Http::withUrlParameters([
            'endpoint' => 'https://content.guardianapis.com/search',
            'apiKey' => env('THE_GUARDIAN_KEY', ''),
        ])->get('{+endpoint}?api-key={apiKey}');

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
                            'published_at' => strtotime($article['webPublicationDate']),
                        )
                    );
                }
            }
        }

        return $news;
    }
}
