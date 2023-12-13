/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save(props) {
	const { attributes } = props;
	const NAMESPACE = "vallee-team-member-block";

	const bioClass =
		attributes.bio && attributes.bio.length
			? `${NAMESPACE}__has-bio`
			: `${NAMESPACE}__no-bio`;

	const blockProps = useBlockProps.save({
		className: bioClass,
	});

	return (
		<div {...blockProps}>
			<img
				className={`${NAMESPACE}__image`}
				src={attributes.imageUrl}
				alt={attributes.imageAlt}
				loading="lazy"
			/>
			<div className={`${NAMESPACE}__container`}>
				<div className={`${NAMESPACE}__name`}>{attributes.name}</div>
				<div className={`${NAMESPACE}__description`}>
					<RichText.Content value={attributes.description} />
				</div>

				<dialog
					data-vtm-dialog={attributes.blockId}
					className={`${NAMESPACE}__biography`}
				>
					<div className={`${NAMESPACE}__biography-container`}>
						<img
							className={`${NAMESPACE}__biography-image`}
							src={attributes.imageUrl}
							alt={attributes.imageAlt}
							loading="lazy"
						/>
						<div className={`${NAMESPACE}__biography-content-container`}>
							<header className={`${NAMESPACE}__biography-header`}>
								<button
									type="button"
									className={`${NAMESPACE}__biography-close`}
								>
									<div class="sr-only">Close</div>
								</button>
								<div className={`${NAMESPACE}__biography-name`}>
									{attributes.name}
								</div>
								<div className={`${NAMESPACE}__biography-description`}>
									<RichText.Content value={attributes.description} />
								</div>
							</header>
							<RichText.Content
								className={`${NAMESPACE}__biography-content`}
								value={attributes.bio}
								tagName="div"
							/>
						</div>
					</div>
				</dialog>
			</div>
		</div>
	);
}
