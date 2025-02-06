import apiFetch from "@wordpress/api-fetch";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	Button,
	Spinner,
	__experimentalDivider as Divider,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useState, useEffect } from "@wordpress/element";
import ServerSideRender from "@wordpress/server-side-render";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Fetch projects when the query changes (minimum 3 characters)
	useEffect(() => {
		if (query.length < 3) {
			setResults([]);
			return;
		}
		setIsLoading(true);
		apiFetch({
			path: `/wp/v2/project?search=${encodeURIComponent(query)}`,
		}).then((posts) => {
			setResults(posts);
			setIsLoading(false);
		});
	}, [query]);

	// Add a project if it isn’t already selected.
	const addProject = (project) => {
		if (!attributes.selectedProjects.includes(project.id)) {
			const updatedProjects = [...attributes.selectedProjects, project.id];
			setAttributes({ selectedProjects: updatedProjects });
		}
	};

	// Remove a project from the selection.
	const removeProject = (projectId) => {
		const updatedProjects = attributes.selectedProjects.filter(
			(id) => id !== projectId,
		);
		setAttributes({ selectedProjects: updatedProjects });
	};

	const moveUp = (projectId) => {
		const index = attributes.selectedProjects.indexOf(projectId);
		if (index > 0) {
			const updatedProjects = [...attributes.selectedProjects];
			[updatedProjects[index], updatedProjects[index - 1]] = [
				updatedProjects[index - 1],
				updatedProjects[index],
			];
			setAttributes({ selectedProjects: updatedProjects });
		}
	};

	const moveDown = (projectId) => {
		const index = attributes.selectedProjects.indexOf(projectId);
		if (index < attributes.selectedProjects.length - 1) {
			const updatedProjects = [...attributes.selectedProjects];
			[updatedProjects[index], updatedProjects[index + 1]] = [
				updatedProjects[index + 1],
				updatedProjects[index],
			];
			setAttributes({ selectedProjects: updatedProjects });
		}
	};

	const selectedProjectsDetails = useSelect(
		(select) =>
			attributes.selectedProjects.map((projectId) =>
				select("core").getEntityRecord("postType", "project", projectId),
			),
		[attributes.selectedProjects],
	);

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title="Selected Projects">
					<TextControl
						__nextHasNoMarginBottom={true}
						label="Search Projects"
						value={query}
						onChange={setQuery}
						placeholder="Type project name…"
					/>
					{isLoading && <Spinner />}
					{results.length > 0 && (
						<ul>
							{results.map((project) => (
								<li
									key={project.id}
									className="project-list-item"
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<span
										style={{ flex: 1 }}
										dangerouslySetInnerHTML={{
											__html: project?.title?.rendered,
										}}
									></span>{" "}
									<Button
										__next40pxDefaultSize={true}
										icon="plus"
										size="small"
										variant="tertiary"
										onClick={() => addProject(project)}
									>
										Add
									</Button>
								</li>
							))}
						</ul>
					)}
					{attributes.selectedProjects.length > 0 && (
						<div style={{ marginTop: "1em" }}>
							<Divider />
							<h3>Selected Projects</h3>
							<ul>
								{attributes.selectedProjects.map((projectId, index) => {
									const project = selectedProjectsDetails[index];
									return (
										<li
											key={projectId}
											style={{
												alignItems: "center",
												justifyContent: "space-between",
												borderBottom: "1px solid #ddd",
												paddingBottom: "0.5em",
											}}
										>
											<div
												dangerouslySetInnerHTML={{
													__html: project?.title?.rendered ?? "Loading…",
												}}
											></div>
											<div
												style={{
													display: "flex",
													justifyContent: "space-between",
													gap: "1em",
												}}
											>
												<Button
													style={{ padding: 0, color: "red" }}
													__next40pxDefaultSize={true}
													size="small"
													isLink
													onClick={() => removeProject(projectId)}
												>
													Remove
												</Button>
												<div style={{ display: "flex", gap: "1em" }}>
													<Button
														style={{ padding: 0 }}
														__next40pxDefaultSize={true}
														size="small"
														isLink
														onClick={() => moveUp(projectId)}
													>
														Move Up
													</Button>
													<Button
														style={{ padding: 0 }}
														__next40pxDefaultSize={true}
														size="small"
														isLink
														onClick={() => moveDown(projectId)}
													>
														Move Down
													</Button>
												</div>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					)}
				</PanelBody>
			</InspectorControls>
			<ServerSideRender
				block="vallee-blocks/featured-projects"
				attributes={{
					selectedProjects: attributes.selectedProjects,
				}}
				key={attributes.selectedProjects.join("-")}
			/>
		</div>
	);
}
