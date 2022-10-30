<?php

namespace Flamarkt\Core\Order\Gambit;

use ClarkWinkelmann\Scout\ScoutStatic;
use Flamarkt\Core\Order\Order;
use Flarum\Extension\ExtensionManager;
use Flarum\Search\GambitInterface;
use Flarum\Search\SearchState;

class FullTextGambit implements GambitInterface
{
    public function apply(SearchState $search, $bit)
    {
        if (!resolve(ExtensionManager::class)->isEnabled('clarkwinkelmann-scout')) {
            $search->getQuery()->where('id', $bit);

            return;
        }

        $builder = ScoutStatic::makeBuilder(Order::class, $bit);

        $ids = $builder->keys();

        $search->getQuery()->whereIn('id', $ids);

        $search->setDefaultSort(function ($query) use ($ids) {
            if (!count($ids)) {
                return;
            }

            $query->orderByRaw('FIELD(id' . str_repeat(', ?', count($ids)) . ')', $ids);
        });
    }
}
