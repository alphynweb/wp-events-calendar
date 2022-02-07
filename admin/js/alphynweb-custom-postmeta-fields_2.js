const {__} = wp.i18n;
//import { __ } from "@wordpress/i18n";
const {compose} = wp.compose;
const {withSelect, withDispatch} = wp.data;
//const {PluginDocumentSettingPanel} = wp.editPost;
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
const {Button, DateTimePicker, Popover, ToggleControl, TextControl, PanelRow} = wp.components;
const {useState} = wp.element;
const Alphynweb_Custom_Post_Meta_Fields = ({ postType, postMeta, setPostMeta }) => {
    if (postType !== 'aw-calendar-events')
        return null; // Only show for aw-calendar-events post type

    const [date, setDate] = useState(new Date());
//    const [openDatePopup, setOpenDatePopup] = useState(false);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const toggleIsPopoverVisible = () => {
        setIsPopoverVisible((state) => !state)
    };
    return(
            <PluginDocumentSettingPanel title={ __('Date and Time of Event', 'alphynweb-calendar-events') } icon="edit" initialOpen="true">
                <PanelRow>
                    <Button variant="secondary" onClick={toggleIsPopoverVisible}>
                        Set date and time of event
                    </Button>
            
                    <p>
            
                    <TextControl
                        value={date}
                        />
                    </p>
            
                    { isPopoverVisible &&
                            <Popover>
                                <DateTimePicker
                                    currentDate={date}
                                    label="Date of event"
                                    is12Hour = {true}
                                    onChange={(newDate) => setDate(newDate)}
                                    />
                            </Popover>
                    }
            
                </PanelRow>
            </PluginDocumentSettingPanel>
            );
}

export default compose([
    withSelect((select) => {
        return {
            postMeta: select('core/editor').getEditedPostAttribute('meta'),
            postType: select('core/editor').getCurrentPostType(),
        };
    }),
    withDispatch((dispatch) => {
        return {
            setPostMeta(newMeta) {
                console.log("Dispatching: newMeta = ", newMeta);
                dispatch('core/editor').editPost({meta: newMeta});
            }
        };
    })
])(Alphynweb_Custom_Post_Meta_Fields);

