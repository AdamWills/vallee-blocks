<?php

namespace Vallee\Blocks;

class ProjectCard
{
	private bool $is_editor = false;

	public function __construct(
		private string $title,
		private ?string $image_url,
		private string $link
	) {
		$this->is_editor = (defined('REST_REQUEST') && REST_REQUEST);
	}

	public function render()
	{

		$link = $this->is_editor ? '#' : $this->link;
?>
		<div class="vallee-blocks-project-card">
			<?php if ($this->image_url) : ?>
				<img src="<?php echo $this->image_url ?>" alt="">
			<?php else : ?>
				<div class="vallee-blocks-project-card__placeholder"></div>
			<?php endif; ?>


			<a href="<?php echo $link ?>">
				<?php echo $this->title; ?>
				<?php if (! $this->is_editor): ?>
					<span class="stretched-link"></span>
				<?php endif; ?>
			</a>
		</div>
<?php
	}
}
