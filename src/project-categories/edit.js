import { Fragment } from "@wordpress/element";
import ServerSideRender from "@wordpress/server-side-render";

export default function Edit() {
	return (
		<Fragment>
			<ServerSideRender block="vallee-blocks/project-categories" />
		</Fragment>
	);
}
