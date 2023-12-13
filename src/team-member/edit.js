import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
	RichText,
} from "@wordpress/block-editor";
import { PanelBody, Button } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes, clientId }) {
	const NAMESPACE = "vallee-team-member-block";

	if (!attributes.blockId) {
		setAttributes({ blockId: clientId });
	}

	return (
		<div {...useBlockProps()}>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) =>
						setAttributes({
							imageUrl: media.sizes.team_member.url,
							imageAlt: media.alt,
						})
					}
					allowedTypes={["image"]}
					value={attributes.imageUrl}
					render={({ open }) => (
						<div
							className={`${NAMESPACE}__image-upload-container ${
								attributes.imageUrl ? "hasImage" : ""
							}`}
						>
							{attributes.imageUrl && (
								<img
									src={attributes.imageUrl}
									alt=""
									className={`${NAMESPACE}__image`}
								/>
							)}

							<Button onClick={open} isSecondary>
								{attributes.imageUrl ? __("Update image") : __("Select image")}
							</Button>
						</div>
					)}
				/>
			</MediaUploadCheck>
			<RichText
				tagName="div"
				className={`${NAMESPACE}__name`}
				value={attributes.name}
				placeholder={__("Name… ")}
				allowedFormats={[]}
				onChange={(newValue) => setAttributes({ name: newValue })}
			/>
			<RichText
				tagName="div"
				className={`${NAMESPACE}__description`}
				value={attributes.description}
				placeholder={__("description… ")}
				allowedFormats={[]}
				onChange={(newValue) => setAttributes({ description: newValue })}
			/>
			<InspectorControls>
				<PanelBody title={__("Biography")}>
					<fieldset>
						<RichText
							rows={20}
							onChange={(newValue) => setAttributes({ bio: newValue })}
							value={attributes.bio}
							style={{ border: "1px solid #949494", padding: "6px 8px" }}
						/>
					</fieldset>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
