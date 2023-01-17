<?php

namespace Flamarkt\Core\Order;

use Flarum\Foundation\AbstractValidator;
use Illuminate\Validation\Rule;

class OrderLineValidator extends AbstractValidator
{
    protected ?OrderLine $line = null;

    // Not used internally, but necessary for extensions using the Validator extender
    public function getOrderLine(): OrderLine
    {
        return $this->line;
    }

    public function setOrderLine(OrderLine $line = null)
    {
        $this->line = $line;
    }

    protected function getRules(): array
    {
        $groups = resolve('flamarkt.order.line.groups');
        $types = resolve('flamarkt.order.line.types');

        // Prevent errors if trying to save an invalid value that was already in the database
        // Otherwise it would be impossible to edit other lines or attributes of a broken order without fixing all problems at once
        // Which might not always be possible or desired
        if ($this->line) {
            if ($this->line->group) {
                $groups[] = $this->line->group;
            }

            if ($this->line->type) {
                $types[] = $this->line->type;
            }
        }

        return [
            'group' => [
                'nullable',
                Rule::in($groups),
            ],
            'type' => [
                'nullable',
                Rule::in($types),
            ],
            'label' => [
                'nullable',
                'string',
                'max:255',
            ],
            'comment' => [
                'nullable',
                'string',
                'max:255',
            ],
            'productUid' => [
                Rule::exists('flamarkt_products', 'uid'),
            ],
            'quantity' => [
                'integer',
                'min:-2147483648', // MySQL signed INT range
                'max:2147483647',
            ],
            'priceUnit' => [
                'integer',
                'min:-2147483648', // MySQL signed INT range
                'max:2147483647',
            ],
        ];
    }
}
