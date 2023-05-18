<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Get preferences
     * 
     * @param Request $request
     */
    public function getPreferences(Request $request)
    {
        try {
            $user = $request->user();
            $preferences = User::where('id', $user->id)->first()->preferences;

            return response()->json([
                'status' => true,
                'message' => $preferences ? unserialize($preferences) : []
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Save preferences
     * 
     * @param Request $request
     */
    public function savePreferences(Request $request)
    {
        try {
            $user = $request->user();
            $user = User::where('id', $user->id);
            $preferences = $user->first()->preferences;
            $preferences = $preferences ? unserialize($preferences) : [];

            $validatePreferences = Validator::make(
                $request->all(),
                [
                    "sources"    => "array",
                    "sources.*"  => "string|distinct|in:bleacher-report,bloomberg,business-insider,buzzfeed,crypto-coins-news,engadget,entertainment-weekly,espn,espn-cric-info,fortune,fox-sports,hacker-news,ign,mashable,mtv-news,nfl-news,nhl-news,polygon,recode,techcrunch,techradar,the-next-web,the-verge,the-wall-street-journal,wired,medical-news-today,national-geographic,new-scientist,next-big-future,new-york-times,the-guardian",
                    "categories"    => "array",
                    "categories.*"  => "string|distinct|in:business,entertainment,tech,health,science,sport",
                    "authors"    => "array",
                    "authors.*"  => "string|distinct",
                ]
            );

            if ($validatePreferences->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation Error',
                    'errors' => $validatePreferences->errors()
                ], 401);
            }

            $preferences = [
                'sources' => $request->sources ? $request->sources : [],
                'categories' => $request->categories ? $request->categories : [],
                'authors' => $request->authors ? $request->authors : []
            ];

            $user->update(['preferences' => serialize($preferences)]);

            return response()->json([
                'status' => true,
                'message' => 'Succes save data',
                'data' => $preferences
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
