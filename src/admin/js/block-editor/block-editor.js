const {registerPlugin} = wp.plugins;

import './block-editor-panels.js'; // Editor sidebar panels
import Alphynweb_Event_Date_Meta_Fields from './custom-meta-fields/datepickers.js'; // Event date meta fields


registerPlugin('alphynweb-custom-post-meta-fields-plugin', {
    render() {
        return(
                <div>
                    <Alphynweb_Event_Date_Meta_Fields />
                </div>
                );
    }
});