<?php

Breadcrumbs::register('index', function ($breadcrumbs) {
    $breadcrumbs->push('首页', '/');
});
Breadcrumbs::register('0b7b8100-2958-11e7-9ab4-e337f0fad04a', function ($breadcrumbs) {
    $breadcrumbs->parent('index');
    $breadcrumbs->push('葡萄酒', '/categories/0b7b8100-2958-11e7-9ab4-e337f0fad04a');
});

Breadcrumbs::register('3e0b2250-2958-11e7-8e55-5188a56248f5', function ($breadcrumbs) {
    $breadcrumbs->parent('index');
    $breadcrumbs->push('烈酒', '/categories/3e0b2250-2958-11e7-8e55-5188a56248f5');
});

Breadcrumbs::register('7f8f6930-2958-11e7-a965-d58ad18552b2', function ($breadcrumbs) {
    $breadcrumbs->parent('index');
    $breadcrumbs->push('酒饰品', '/categories/7f8f6930-2958-11e7-a965-d58ad18552b2');
});
