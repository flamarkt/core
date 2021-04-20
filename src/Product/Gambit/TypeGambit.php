<?php

namespace Flamarkt\Core\Product\Gambit;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;
use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\SearchState;
use Illuminate\Database\Query\Builder;

class TypeGambit extends AbstractRegexGambit implements FilterInterface
{
    protected function getGambitPattern(): string
    {
        return 'type:(.+)';
    }

    protected function conditions(SearchState $search, array $matches, $negate)
    {
        $this->constrain($search->getQuery(), $matches[1], $negate);
    }

    public function getFilterKey(): string
    {
        return 'type';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $this->constrain($filterState->getQuery(), $filterValue, $negate);
    }

    protected function constrain(Builder $query, $value, $negate)
    {
        $query->where('flamarkt_products.type', $negate ? '!=' : '=', $value);
    }
}
