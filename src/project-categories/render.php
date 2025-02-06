<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

if (!defined('ABSPATH')) {
	exit;
}

require_once WP_PLUGIN_DIR . '/vallee-blocks/includes/class-project-card.php';

// if this is not a category archive page, do not render the block]
$category_args = is_archive('project-category') ? ['parent' => get_queried_object_id()] : ['parent' => 0];
$categories = get_terms('project-category', $category_args);

?>

<div <?php echo get_block_wrapper_attributes(['class' => count($categories) > 0 ? 'has-categories' : 'empty']); ?>>
	<?php foreach ($categories as $category) :
		$image = get_field('category_image', 'project-category_' . $category->term_id);
		$image_url = $image ? $image['sizes']['medium_large'] : null;

		$card = new Vallee\Blocks\ProjectCard(
			$category->name,
			$image_url,
			get_category_link($category->term_id)
		);

		$card->render();
	endforeach; ?>
</div>