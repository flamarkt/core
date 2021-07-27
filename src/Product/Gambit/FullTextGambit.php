<?php

namespace Flamarkt\Core\Product\Gambit;

use Flarum\Search\GambitInterface;
use Flarum\Search\SearchState;

class FullTextGambit implements GambitInterface
{
    public function apply(SearchState $search, $bit)
    {
        $search->getQuery()->where('title', 'like', '%' . $bit . '%');
    }
}
