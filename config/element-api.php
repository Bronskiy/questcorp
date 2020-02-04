<?php

use craft\elements\MatrixBlock;
use craft\helpers\UrlHelper;

return [
  'endpoints' => [
    'api/portfolio/<blockId:\d+>.json' => function($blockId) {
      return [
        'elementType' => MatrixBlock::class,
        'criteria' => ['ownerId' => '4351', 'fieldId' => '218', 'id' => $blockId],
        'pretty' => true,
        'transformer' => function(MatrixBlock $element){
          $fotografii = [];
          foreach ($element->getFieldValue('fotografii')->all() as $el) {
            $fotografii[] = [
              'images_cropped' => $el->getUrl('image370x275'),
              'images' => $el->getUrl(),
              'images_id' => $el->id,
            ];
          }
          return [
            'photos' => $fotografii,
            //'image' => $element->getFieldValue('izobrazhenie')->one()->getUrl(),
          ];
          /*
          return [
          'image' => $element->getFieldValue('izobrazhenie')->one()->getUrl(),
          'images' => $element->getFieldValue('fotografii')->all(),
        ];
        */
      },
    ];
  },
  // TODO:
  // отличается только ID страницы, нужно передавать ID в запросе.
  'api/portfolio-tb/<blockId:\d+>/<pageId:\d+>.json' => function($blockId, $pageId) {
    return [
      'elementType' => MatrixBlock::class,
      'criteria' => ['ownerId' => $pageId, 'fieldId' => '218', 'id' => $blockId],
      'pretty' => true,
      'transformer' => function(MatrixBlock $element){
        $fotografii = [];
        foreach ($element->getFieldValue('fotografii')->all() as $el) {
          $fotografii[] = [
            'images_cropped' => $el->getUrl('image370x275'),
            'images' => $el->getUrl(),
            'images_id' => $el->id,
          ];
        }
        return [
          'photos' => $fotografii,
          //'image' => $element->getFieldValue('izobrazhenie')->one()->getUrl(),
        ];
        /*
        return [
        'image' => $element->getFieldValue('izobrazhenie')->one()->getUrl(),
        'images' => $element->getFieldValue('fotografii')->all(),
      ];
      */
    },
  ];
},
]
];
