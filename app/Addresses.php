<?php

namespace App;

use App\Base;

class Addresses extends Base
{
    public static function addressList()
    {
        //输出用户所有地址薄
        $address = Addresses::where(['members_uuid'=>session('uuid')])
            ->orderBy('is_default', 'ASC')
            ->get()
            ->toArray();

        foreach ($address as $k => $value) {
            $areas =  Areas::where('uuid', '=', $value['areas_uuid'])
                ->first()
                ->toArray();

            $parats = Areas::where('lft', '<', $areas['lft'])
                ->where('rgt', '>', $areas['rgt'])
                ->get()
                ->toArray();
            $tree = array_to_tree($parats);

            if (trim($tree[0]['sub'][0]['name'])=='市辖区'
                ||trim($tree[0]['sub'][0]['name'])=='县') {
                $address[$k]['address_tree'] = $tree;
                $address[$k]['add'] = $tree[0]['name'].$areas['name'];
                $address[$k]['city'] = $tree[0]['name'];
            } else {
                $address[$k]['address_tree'] = $tree;
                $address[$k]['add'] = $tree[0]['name'].$tree[0]['sub'][0]['name'].$areas['name'];
                $address[$k]['city'] = $tree[0]['sub'][0]['name'];
            }
            $address[$k]['zone'] = $areas['name'];
        }
        return $address;
    }

    public static function getAddress($uuid)
    {
        //输出用户所有地址薄
        $address = Addresses::where('members_uuid', session('uuid'))
                            ->where('uuid', $uuid)
                            ->first()
                            ->toArray();

        $areas = Areas::where('uuid', $address['areas_uuid'])
                        ->first()
                        ->toArray();

        $parats = Areas::where('lft', '<', $areas['lft'])
                        ->where('rgt', '>', $areas['rgt'])
                        ->get()
                        ->toArray();

        $tree = array_to_tree($parats);

        if (trim($tree[0]['sub'][0]['name'])=='市辖区'
            ||trim($tree[0]['sub'][0]['name'])=='县') {
            $address['add'] = $tree[0]['name'].$areas['name'];
            $address['city'] = $tree[0]['name'];
        } else {
            $address['add'] = $tree[0]['name'].$tree[0]['sub'][0]['name'].$areas['name'];
            $address['city'] = $tree[0]['sub'][0]['name'];
        }
        $address['zone'] = $areas['name'];

        return $address;
    }
}
