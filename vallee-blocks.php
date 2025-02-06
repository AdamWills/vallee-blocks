<?php

/**
 * Plugin Name:       Vallee Blocks
 * Description:       Custom blocks used for the gdvallee.ca.
 * Requires at least: 6.1
 * Requires PHP:      8.0
 * Version:           0.3.0
 * Author:            Adam Wills
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       vallee-blocks
 *
 * @package           create-block
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

add_action('init', function () {
	register_block_type(__DIR__ . '/build/featured-projects');
	register_block_type(__DIR__ . '/build/team-member');
	register_block_type(__DIR__ . '/build/project-categories');
	register_block_type(__DIR__ . '/build/project-cards');
});

// add custom thumbnail size
add_action('after_setup_theme', function () {
	add_image_size('team_member', 600, 700);
});

add_filter('image_size_names_choose', function ($size_names) {
	$new_sizes = array(
		'team_member' => __('Team Member', 'vallee-blocks'),
	);
	return array_merge($size_names, $new_sizes);
});

add_filter('block_categories_all', function ($categories) {
	$categories[] = array(
		'slug'  => 'vallee-blocks',
		'title' => 'Vallee Blocks'
	);
	return $categories;
});
