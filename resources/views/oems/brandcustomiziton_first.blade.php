@extends('layouts_member')
@section('CSS')
    @parent
    <link rel="stylesheet" href="/css/brand_customization1.css"/>
@stop

@section('right')
<div class="box_h">品牌定制</div>
<div class="kind_reminder">
    尊敬的用户：<br />
    OEM是依托上游的合作伙伴和顶级的专家咨询团队，专门为满足客户品牌的定制需求，而推出的透明，安心，便捷的独家定制服务。
    荟酒网的合作伙伴遍及全球各地，目前就法国、西班牙可以定制，后续会逐步开放其他国家的定制服务。
    温馨提示：定制合同签订后，生产和运输周期大约是<span>1-4</span>个月。
</div>
<div class="check_countries_container">
    <div class="check_country_words_container">
        <span class="check_country_words">选择国家:</span>
        <span class="brand_country_name">法国</span>
    </div>

    <div class="brand_national_flag add_brand_national_flag" data-countrys-uuid="111" data_name="法国" data-uuid='faguo'>
        <img class="flag_img" src='http://image.huijiuguoji.com/20170425/d31f7c81d5a88293ba939c04420dacd7.jpeg/300x200'>
        <div class="flag_word">法国</div>
    </div>
     <div class="brand_national_flag" data-countrys-uuid="222" data_name="西班牙" data-uuid='xibanya'>
        <img class="flag_img" src='http://image.huijiuguoji.com/20170605/17b87ade0da1e468ad57747f933fd048.png/300x200'>
        <div class="flag_word">西班牙</div>
    </div>
    
</div>

<div class="check_country_variety">
    <p>选择品种：</p>
    <table class="check_country_variety_container" cellspacing="0" cellpadding="0" data-uuid-name='faguo' data_click='1'>
        <tr class="check_country_variety_headbar">
            <td class="variety_headbar1">选择</td>
            <td class="variety_headbar2">等级</td>
            <td class="variety_headbar4">类型</td>
            <td class="variety_headbar3">产区</td>
            <td class="variety_headbar4">葡萄品种</td>
            <td class="variety_headbar4">年份</td>
            <td class="variety_headbar4">酒精度</td>
            <td class="variety_headbar5">容量</td>
            <td class="variety_headbar6">瓶型</td>
            <td class="variety_headbar7">酒帽</td>
            <td class="variety_headbar8">价格(元)每瓶起</td>
        </tr>
        <tr class="variety_content" data-country-uuid="7dab63e0-6390-11e7-983c-ebd097d9893c" bottle_uuid='b2053bd0-6382-11e7-91b3-f984bb3b4cb7' data-moq='1800' data-bottle='bottle02.png' data-label='{"img":"01.png","price":2,"data_src":"01.png","name":"纸标UV","label_uuid":"d43eabe0-62f8-11e7-a65a-f51d8693680f"}|{"img":"02.png","data_src":"02.png","price":2,"name":"纸标UV","label_uuid":"e88b4640-62f8-11e7-8b4c-9d9437044d1e"}|{"img":"03.png","data_src":"03.png","price":2,"name":"纸标UV","label_uuid":"f37fe8b0-62f8-11e7-bd99-1d21fb5caeee"}|{"img":"special.png","data_src":"special01.png","price":2,"name":"专属定制","label_uuid":"1cebeb30-6abd-11e7-bcd3-6decd0ed8263"}'>
            <td class="variety_ck">
                <div class="variety_ck_box checkbox_change" data-uuid="11">
                </div>
            </td>
            <td class="variety_rank">VCE</td>
            <td class="variety_area">干红</td>
            <td class="variety_type">欧盟</td>
            <td class="variety_capacity">混酿</td>
            <td class="variety_remark">无</td>
            <td class="variety_start">13%vol</td>
            <td class="variety_price">750ml</td>
            <td class="variety_remark">波尔多瓶</td>
            <td class="variety_start">金色</td>
            <td class="variety_price">15</td>
        </tr>
        <tr class="variety_content" data-country-uuid="3d18e860-6387-11e7-88f6-1ba50b25f434" data-moq='1800' data-bottle='bottle04.png' bottle_uuid='a913ede0-6381-11e7-b047-33d236c85aea' data-label='{"img":"07.png","data_src":"07.png","price":2,"name":"纸标印金","label_uuid":"80076f30-62f5-11e7-945d-d3662711e55f"}|{"img":"08.png","data_src":"08.png","price":2,"name":"纸标UV","label_uuid":"92386840-62f5-11e7-9de4-b3adfdaad63e"}|{"img":"09.png", "data_src":"09.png","price":2,"name":"纸标UV","label_uuid":"a321cbe0-62f5-11e7-bd22-738bf4fadadb"}|{"img":"special.png","data_src":"special02.png","price":2,"name":"专属定制","label_uuid":"d6ce8150-6abc-11e7-b4fd-15f8201456d4"}'>
            <td class="variety_ck">
                <div class="variety_ck_box" data-uuid="11">
                </div>
            </td>
            <td class="variety_rank">VCE</td>
            <td class="variety_area">干红</td>
            <td class="variety_type">欧盟</td>
            <td title="丹魄、赤霞珠" class="variety_capacity">丹魄、赤霞珠</td>
            <td class="variety_remark">2016</td>
            <td class="variety_start">13%vol</td>
            <td class="variety_price">750ml</td>
            <td class="variety_remark">波尔多瓶</td>
            <td class="variety_start">红色</td>
            <td class="variety_price">15</td>
        </tr>
        <tr class="variety_content" data-country-uuid="51642ae0-6387-11e7-befc-a5957c22e0a2" bottle_uuid='9cb50890-6381-11e7-985d-af8c8895a2de' data-moq='1800' data-bottle='bottle05.png' data-label='{"img":"04.png","data_src":"04.png","price":2,"name":"纸标烫金","label_uuid":"6ee0fe30-62f5-11e7-b23d-b9385d1cced7"}|{"img":"05.png","data_src":"05.png","price":2,"name":"纸标烫金","label_uuid":"80076f30-62f5-11e7-945d-d3662711e55f"}|{"img":"06.png","data_src":"06.png","price":2,"name":"纸标烫金","label_uuid":"92386840-62f5-11e7-9de4-b3adfdaad63e"}|{"img":"special.png","data_src":"special03.png","price":2,"name":"专属定制","label_uuid":"c4002450-6abc-11e7-8479-b35587e6806c"}'>
            <td class="variety_ck">
                <div class="variety_ck_box" data-uuid="11">
                </div>
            </td>
            <td class="variety_rank">VCE</td>
            <td class="variety_area">干红</td>
            <td class="variety_type">欧盟</td>
            <td title="丹魄、赤霞珠" class="variety_capacity">丹魄、赤霞珠</td>
            <td class="variety_remark">2016</td>
            <td class="variety_start">13%vol</td>
            <td class="variety_price">750ml</td>
            <td class="variety_remark">波尔多瓶</td>
            <td class="variety_start">黑色</td>
            <td class="variety_price">15</td>
        </tr>
        <tr class="variety_content" data-country-uuid="83df14c0-6390-11e7-b187-dde54e61c713" bottle_uuid='69f2e7b0-6381-11e7-8d41-d3ab758b85c4' data-moq='1800' data-bottle='bottle06.png' data-label='{"img":"10.png","data_src":"10.png","price":2,"name":"纸标烫金","label_uuid":"3a84f5e0-62f4-11e7-91f1-0bd71205ffc1"}|{"img":"11.png","data_src":"11.png","price":2,"name":"纸标烫金","label_uuid":"3a84f5e0-62f4-11e7-91f1-0bd71205ffc1"}|{"img":"12.png","data_src":"12.png","price":2,"name":"纸标烫金","label_uuid":"6aaea630-62f4-11e7-8c51-19b459c8f2cf"}|{"img":"13.png","data_src":"13.png","price":2,"name":"纸标UV","label_uuid":"8902f010-62f4-11e7-9609-cf18d29b9a39"}|{"img":"special.png","data_src":"special04.png","price":2,"name":"专属定制","label_uuid":"acf81860-6abc-11e7-b903-a15f8e52a110"}'>
            <td class="variety_ck">
                <div class="variety_ck_box" data-uuid="11">
                </div>
            </td>
            <td class="variety_rank">IGP</td>
            <td class="variety_area">干红</td>
            <td class="variety_type">奥克</td>
            <td title='美乐' class="variety_capacity">美乐</td>
            <td class="variety_remark">2015</td>
            <td class="variety_start">13%vol</td>
            <td class="variety_price">750ml</td>
            <td class="variety_remark">波尔多瓶</td>
            <td class="variety_start">酒红色</td>
            <td class="variety_price">22.5</td>
        </tr>
         <tr class="variety_content" data-country-uuid="bccc5d30-6387-11e7-afc9-a981239a960b" bottle_uuid='a1185f30-6382-11e7-a62f-71942fee9e1b' data-moq='1800' data-bottle='bottle09.png' data-label='{"img":"22.png","data_src":"22.png","price":2,"name":"纸标UV","label_uuid":"7a1c2540-62f8-11e7-bee5-a7ccefeda79e"}|{"img":"23.png","data_src":"23.png","price":2,"name":"纸标烫金","label_uuid":"874a8910-62f8-11e7-bcf8-6bd9ad15a127"}|{"img":"24.png","data_src":"24.png","price":2,"name":"纸标UV","label_uuid":"94d2f100-62f8-11e7-999a-75e7758e4477"}|{"img":"25.png","data_src":"25.png","price":2,"name":"纸标烫金","label_uuid":"b0224ca0-62f8-11e7-9f92-63d653381518"}|{"img":"special.png","data_src":"special05.png","price":2,"name":"专属定制","label_uuid":"8f1ea000-6abc-11e7-baff-bbf66babf5e3"}'>
            <td class="variety_ck">
                <div class="variety_ck_box" data-uuid="11">
                </div>
            </td>
            <td class="variety_rank">AOP</td>
            <td class="variety_area">干红</td>
            <td class="variety_type">朗格多克</td>
            <td title='西拉、歌海娜、佳丽酿' class="variety_capacity">西拉、歌海娜、佳丽酿</td>
            <td class="variety_remark">无</td>
            <td class="variety_start">13%vol</td>
            <td class="variety_price">750ml</td>
            <td class="variety_remark">波尔多瓶</td>
            <td class="variety_start">红色</td>
            <td class="variety_price">28</td>
        </tr>
        <tr class="variety_content" data-country-uuid="74b26b30-6390-11e7-8488-e3faa6d44599" bottle_uuid='53a855f0-6382-11e7-a5b4-6bef8d9dcdb0' data-moq='1800' data-bottle='bottle15.png' data-label='{"img":"14.png","data_src":"14.png","price":2,"name":"仿金属标","label_uuid":"643f2d80-62f7-11e7-a83e-17d7382f0da9"}|{"img":"15.png","data_src":"15.png","price":2,"name":"纸标UV","label_uuid":"71323a30-62f7-11e7-975e-0d82e11d9d20"}|{"img":"16.png","data_src":"16.png","price":2,"name":"纸标烫金","label_uuid":"804537f0-62f7-11e7-a7ff-93d94873d1aa"}|{"img":"17.png","data_src":"17.png","price":2,"name":"纸标UV","label_uuid":"92398410-62f7-11e7-b54d-69f2c6fc7cd7"}|{"img":"special.png","data_src":"special07.png","price":2,"name":"专属定制","label_uuid":"526d4b60-6abb-11e7-b1fa-4503b3e7b832"}'>
            <td class="variety_ck">
                <div class="variety_ck_box" data-uuid="11">
                </div>
            </td>
            <td class="variety_rank">AOP</td>
            <td class="variety_area">干红</td>
            <td class="variety_type">波尔多</td>
            <td title='混酿' class="variety_capacity">混酿</td>
            <td class="variety_remark">2015</td>
            <td class="variety_start">13%vol</td>
            <td class="variety_price">750ml</td>
            <td class="variety_remark">宽肩重型瓶</td>
            <td class="variety_start">玫瑰金色</td>
            <td class="variety_price">28</td>
        </tr>
        <tr class="variety_content" data-country-uuid="6d307c00-6388-11e7-92f4-c9fba52af112" bottle_uuid='69a194a0-6382-11e7-9588-6188fc94abda' data-moq='1800' data-bottle='bottle16.png' data-label='{"img":"18.png","data_src":"18.png","price":2,"name":"纸标UV","label_uuid":"ba8d7710-62f7-11e7-bd5d-87b7384d44a8"}|{"img":"19.png","data_src":"19.png","price":2,"name":"纸标UV","label_uuid":"c73fefb0-62f7-11e7-9dfe-eb0f8781705c"}|{"img":"20.png","data_src":"20.png","price":2,"name":"纸标烫金","label_uuid":"d587aaa0-62f7-11e7-b546-1fc748fc60f2"}|{"img":"21.png","data_src":"21.png","price":2,"name":"纸标UV","label_uuid":"e1663640-62f7-11e7-a451-5fdff0ca9929"}|{"img":"special.png","data_src":"special06.png","price":2,"name":"专属定制","label_uuid":"526d4b60-6abb-11e7-b1fa-4503b3e7b832"}'>
            <td class="variety_ck">
                <div class="variety_ck_box" data-uuid="11">
                </div>
            </td>
            <td class="variety_rank">AOP</td>
            <td class="variety_area">干红</td>
            <td class="variety_type">波尔多</td>
            <td title='赤霞珠、美乐' class="variety_capacity">赤霞珠、美乐</td>
            <td class="variety_remark">2016</td>
            <td class="variety_start">13%vol</td>
            <td class="variety_price">750ml</td>
            <td class="variety_remark">宽肩雕花瓶</td>
            <td class="variety_start">金色</td>
            <td class="variety_price">35</td>
        </tr>
    </table>
    <table class="check_country_variety_container" cellspacing="0" cellpadding="0" data-uuid-name='xibanya' style='display: none' data_click='0'>
        <tr class="check_country_variety_headbar">
            <td class="variety_headbar1">选择</td>
            <td class="variety_headbar2">等级</td>
            <td class="variety_headbar4">类型</td>
            <td class="variety_headbar3">产区</td>
            <td class="variety_headbar4">葡萄品种</td>
            <td class="variety_headbar4">年份</td>
            <td class="variety_headbar4">酒精度</td>
            <td class="variety_headbar5">容量</td>
            <td class="variety_headbar6">瓶型</td>
            <td class="variety_headbar7">酒帽</td>
            <td class="variety_headbar8">价格(元)每瓶起</td>
        </tr>
        <tr class="variety_content" data-country-uuid="9d834290-6388-11e7-84c7-1788fcc891b2" bottle_uuid='4378ea80-6382-11e7-a94b-bdedd55d4ec7' data-moq='1800' data-bottle='bottle17.png' data-label='{"img":"26.png","data_src":"26.png","price":2,"name":"纸标烫金","label_uuid":"fbaa03e0-62f6-11e7-b735-ff84c78c7a82"}|{"img":"27.png","data_src":"27.png","price":2,"name":"纸标UV","label_uuid":"08b2bf30-62f7-11e7-865b-9d32ba8b6768"}|{"img":"28.png","data_src":"28.png","price":2,"name":"纸标UV","label_uuid":"14c536d0-62f7-11e7-9625-8f20c530885c"}|{"img":"29.png","data_src":"29.png","price":2,"name":"纸标UV","label_uuid":"23fff500-62f7-11e7-a7b5-97b0ead3c021"}|{"img":"special.png","data_src":"special08.png","price":2,"name":"专属定制","label_uuid":"ea5b43c0-6aba-11e7-96de-bb163b8a856f"}'>
            <td class="variety_ck">
                <div class="variety_ck_box checkbox_change" data-uuid="11">
                </div>
            </td>
            <td class="variety_rank">VDM</td>
            <td class="variety_area">干红</td>
            <td class="variety_type">埃斯特雷马杜拉
</td>
            <td class="variety_capacity">丹魄</td>
            <td class="variety_remark">2016</td>
            <td class="variety_start">12%vol</td>
            <td class="variety_price">750ml</td>
            <td class="variety_remark">波尔多瓶</td>
            <td class="variety_start">黑色</td>
            <td class="variety_price">13</td>
        </tr>
    </table>
    <input class="brand_nextstep" type="button" style="background-color: #f3554a" value="下一步" />
</div>
<!--选择品种结束-->
@stop

@section('JS')
@parent
    <script type="text/javascript" src="/js/jquery.cookie.js" ></script>
	<script type="text/javascript" src="/js/brand_step1.js" ></script>
    
@stop