const {registerPlugin} = wp.plugins;

import './alphynweb-gutenberg-editor-panels.js'; // Editor sidebar panels
import Alphynweb_Start_Date_Meta_Fields from './custom-meta-fields/alphynweb-start-date-meta-fields.js'; // Editor start date meta fields
import Alphynweb_End_Date_Meta_Fields from './custom-meta-fields/alphynweb-end-date-meta-fields.js'; // Editor end date meta fields


registerPlugin('alphynweb-custom-post-meta-fields-plugin', {
    render() {
        return(
                <div>
                    <Alphynweb_Start_Date_Meta_Fields />
                    <Alphynweb_End_Date_Meta_Fields />
                </div>
                );
    }
});