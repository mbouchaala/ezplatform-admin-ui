<?php

/**
 * @copyright Copyright (C) eZ Systems AS. All rights reserved.
 * @license For full copyright and license information view LICENSE file distributed with this source code.
 */
namespace EzSystems\EzPlatformAdminUi\RepositoryForms\Data;

use eZ\Publish\API\Repository\Values\Content\Content;
use EzSystems\RepositoryForms\Data\Content\FieldData;
use EzSystems\RepositoryForms\Data\ContentTranslationData as BaseContentTranslationData;
use EzSystems\RepositoryForms\Data\NewnessCheckable;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @property FieldData[] $fieldsData
 * @property Content $content
 */
class ContentTranslationData extends BaseContentTranslationData implements NewnessCheckable
{
    /**
     * @var \EzSystems\RepositoryForms\Data\Content\FieldData[]
     *
     * @Assert\Valid()
     */
    protected $fieldsData;

    public function addFieldData(FieldData $fieldData)
    {
        $this->fieldsData[$fieldData->fieldDefinition->identifier] = $fieldData;
    }

    protected $content;

    protected $contentType;

    public function isNew()
    {
        return false;
    }
}
