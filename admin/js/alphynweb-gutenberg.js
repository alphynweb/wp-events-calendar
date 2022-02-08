const {registerPlugin} = wp.plugins;

import './alphynweb-gutenberg-editor-panels.js'; // Editor sidebar panels
import Alphynweb_Event_Date_Meta_Fields from './custom-meta-fields/date-meta-fields.js'; // Event date meta fields


registerPlugin('alphynweb-custom-post-meta-fields-plugin', {
    render() {
        return(
                <div>
                    <Alphynweb_Event_Date_Meta_Fields />
                </div>
                );
    }
});