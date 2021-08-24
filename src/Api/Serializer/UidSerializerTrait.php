<?php

namespace Flamarkt\Core\Api\Serializer;

trait UidSerializerTrait
{
    public function getId($model)
    {
        return $model->uid;
    }
}
