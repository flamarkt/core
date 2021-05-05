<?php

namespace Flamarkt\Core\Order\Gambit;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;
use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\SearchState;
use Flarum\User\UserRepository;
use Illuminate\Database\Query\Builder;

// Based on Flarum AuthorFilterGambit
class UserGambit extends AbstractRegexGambit implements FilterInterface
{
    protected $users;

    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    protected function getGambitPattern(): string
    {
        return 'user:(.+)';
    }

    protected function conditions(SearchState $search, array $matches, $negate)
    {
        $this->constrain($search->getQuery(), $matches[1], $negate);
    }

    public function getFilterKey(): string
    {
        return 'user';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $this->constrain($filterState->getQuery(), $filterValue, $negate);
    }

    protected function constrain(Builder $query, $rawUsernames, $negate)
    {
        $usernames = trim($rawUsernames, '"');
        $usernames = explode(',', $usernames);

        $ids = [];
        foreach ($usernames as $username) {
            $ids[] = $this->users->getIdForUsername($username);
        }

        $query->whereIn('flamarkt_orders.user_id', $ids, 'and', $negate);
    }
}
