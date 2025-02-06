<?php

namespace Vallee\Blocks;

class ProjectCard
{
	public function __construct(
		private string $title,
		private ?string $image_url,
		private string $link
	) {
	}

	public function render()
	{

		$link = (defined('REST_REQUEST') && REST_REQUEST) ? '#' : $this->link;
?>
		<div class="vallee-blocks-project-card">
			<?php if ($this->image_url) : ?>
				<img src="<?php echo $this->image_url ?>" alt="">
			<?php else : ?>
				<div class="vallee-blocks-project-card__placeholder"></div>
			<?php endif; ?>
			<a href="<?php echo $link ?>">
				<?php echo $this->title; ?>
				<span class="stretched-link"></span>
			</a>
		</div>
<?php
	}
}
