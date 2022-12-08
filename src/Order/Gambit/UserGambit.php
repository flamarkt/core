<?php

namespace Flamarkt\Core\Order\Gambit;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;
use Flarum\Http\SlugDriverInterface;
use Flarum\Http\SlugManager;
use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\SearchState;
use Flarum\User\User;
use Illuminate\Database\Query\Builder;

// Based on Flarum AuthorFilterGambit but adapted to use slug instead of username
class UserGambit extends AbstractRegexGambit implements FilterInterface
{
    protected SlugDriverInterface $slugDriver;

    public function __construct(SlugManager $slugManager)
    {
        $this->slugDriver = $slugManager->forResource(User::class);
    }

    protected function getGambitPattern(): string
    {
        return 'user:(.+)';
    }

    protected function conditions(SearchState $search, array $matches, $negate)
    {
        $this->constrain($search->getQuery(), $matches[1], $negate, $search->getActor());
    }

    public function getFilterKey(): string
    {
        return 'user';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $this->constrain($filterState->getQuery(), $filterValue, $negate, $filterState->getActor());
    }

    protected function constrain(Builder $query, $rawSlugs, $negate, User $actor)
    {
        $slugs = trim($rawSlugs, '"');
        $slugs = explode(',', $slugs);

        $ids = [];
        foreach ($slugs as $slug) {
            $ids[] = $this->slugDriver->fromSlug($slug, $actor)->id;
        }

        $query->whereIn('flamarkt_orders.user_id', $ids, 'and', $negate);
    }
}
