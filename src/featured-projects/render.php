<?php

/**
 * Dynamic Block Template.
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 */

require_once WP_PLUGIN_DIR . '/vallee-blocks/includes/class-project-card.php';

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$project_ids = $attributes['selectedProjects'];

$projects = ! empty($project_ids) ? get_posts([
	'numberposts' => -1,
	'post_type' => 'project',
	'post__in' => $project_ids,
	'orderby' => 'post__in',
	'suppress_filters' => false
]) : null;

$is_editing = (defined('REST_REQUEST') && REST_REQUEST);

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
		<?php elseif ($is_editing) : ?>
			<p>No featured projects selected. Select some projects in the sidebar to the right.</p>
		<?php endif; ?>
		</div>
</div>