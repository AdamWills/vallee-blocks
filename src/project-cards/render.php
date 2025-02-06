<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

if (!defined('ABSPATH')) {
	exit;
}

require_once WP_PLUGIN_DIR . '/vallee-blocks/includes/class-project-card.php';

// if this is not a category archive page, do not render the block]


$category_args = [
	'numberposts' => -1,
	'post_type' => 'project',
	'suppress_filters' => false
];


if (is_archive('project-category')) {
	$category_args['tax_query'] = [
		[
			'taxonomy' => 'project-category',
			'field' => 'slug',
			'terms' => get_queried_object()->slug,
			'include_children' => false,
		]
	];
};

// get all posts directly in a category
$projects = get_posts($category_args);

?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php if ($projects) : ?>
		<div class="project-cards__container">
			<?php foreach ($projects as $project) : ?>
				<?php
				$card = new Vallee\Blocks\ProjectCard(
					$project->post_title,
					// featured image
					get_the_post_thumbnail_url($project->ID, 'large'),
					get_permalink($project->ID)
				);
				echo $card->render();
				?>
			<?php endforeach; ?>
		<?php endif; ?>
		</div>
</div>