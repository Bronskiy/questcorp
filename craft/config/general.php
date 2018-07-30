<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the default settings in `vendor/craftcms/cms/src/config/defaults/general.php`.
 */

return [
    // Base site URL
	'siteUrl' => [
		'moskva' => 'https://questcorp.events/',
		'arkhangelsk' => 'https://arkhangelsk.questcorp.events/',
		'astrakhan' => 'https://astrakhan.questcorp.events/',
		'barnaul' => 'https://barnaul.questcorp.events/',
		'belgorod' => 'https://belgorod.questcorp.events/',
		'vladivostok' => 'https://vladivostok.questcorp.events/',
		'vladimir' => 'https://vladimir.questcorp.events/',
		'volgograd' => 'https://volgograd.questcorp.events/',
		'volgodonsk' => 'https://volgodonsk.questcorp.events/',
		'volgodonsk' => 'https://volgodonsk.questcorp.events/',
		'voronezh' => 'https://voronezh.questcorp.events/',
		'gelendzhik' => 'https://gelendzhik.questcorp.events/',
		'ekaterinburg' => 'https://ekaterinburg.questcorp.events/',
		'ivanovo' => 'https://ivanovo.questcorp.events/',
		'izhevsk' => 'https://izhevsk.questcorp.events/',
		'iola' => 'https://iola.questcorp.events/',
		'kazan' => 'https://kazan.questcorp.events/',
		'kaliningrad' => 'https://kaliningrad.questcorp.events/',
		'kemerovo' => 'https://kemerovo.questcorp.events/',
		'kirov' => 'https://kirov.questcorp.events/',
		'krasnodar' => 'https://krasnodar.questcorp.events/',
		'krasnoyarsk' => 'https://krasnoyarsk.questcorp.events/',
		'kurgan' => 'https://kurgan.questcorp.events/',
		'lipetsk' => 'https://lipetsk.questcorp.events/',
		'murmansk' => 'https://murmansk.questcorp.events/',
		'chelny' => 'https://chelny.questcorp.events/',
		'nizhnevartovsk' => 'https://nizhnevartovsk.questcorp.events/',
		'nn' => 'https://nn.questcorp.events/',
		'novokuznetsk' => 'https://novokuznetsk.questcorp.events/',
		'novorossiysk' => 'https://novorossiysk.questcorp.events/',
		'novosibirsk' => 'https://novosibirsk.questcorp.events/',
		'omsk' => 'https://omsk.questcorp.events/',
		'orenburg' => 'https://orenburg.questcorp.events/',
		'penza' => 'https://penza.questcorp.events/',
		'perm' => 'https://perm.questcorp.events/',
		'rnd' => 'https://rnd.questcorp.events/',
		'ryazan' => 'https://ryazan.questcorp.events/',
		'samara' => 'https://samara.questcorp.events/',
		'spb' => 'https://spb.questcorp.events/',
		'saratov' => 'https://saratov.questcorp.events/',
		'sevastopol' => 'https://sevastopol.questcorp.events/',
		'severodvinsk' => 'https://severodvinsk.questcorp.events/',
		'sochi' => 'https://sochi.questcorp.events/',
		'surgut' => 'https://surgut.questcorp.events/',
		'taganrog' => 'https://taganrog.questcorp.events/',
		'tver' => 'https://tver.questcorp.events/',
		'tolyatti' => 'https://tolyatti.questcorp.events/',
		'tomsk' => 'https://tomsk.questcorp.events/',
		'tula' => 'https://tula.questcorp.events/',
		'tyumen' => 'https://tyumen.questcorp.events/',
		'ulyanovsk' => 'https://ulyanovsk.questcorp.events/',
		'ufa' => 'https://ufa.questcorp.events/',
		'khabarovsk' => 'https://khabarovsk.questcorp.events/',
		'chelyabinsk' => 'https://chelyabinsk.questcorp.events/',
		'usakh' => 'https://usakh.questcorp.events/',
],

'securityKey' => 'rsHz2SF0TfhwJcd7Ht3M0f8smaaoXA13',
// Default Week Start Day (0 = Sunday, 1 = Monday...)
'defaultWeekStartDay' => 0,

// Enable CSRF Protection (recommended, will be enabled by default in Craft 3)
'enableCsrfProtection' => true,

// Whether "index.php" should be visible in URLs (true, false, "auto")
'omitScriptNameInUrls' => 'auto',

// Control Panel trigger word
'cpTrigger' => 'admin',

// Dev Mode (see https://craftcms.com/support/dev-mode)
'devMode' => false,
'maxInvalidLogins' => 3,
'convertFilenamesToAscii' => true,
'limitAutoSlugsToAscii' => true,
'userSessionDuration' => 	'P1D',
'overridePhpSessionLocation' => '/apps/questcorp/craft/storage/runtime/sessions',

];
