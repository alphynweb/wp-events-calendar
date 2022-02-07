const {__} = wp.i18n;
//import { __ } from "@wordpress/i18n";
const {compose} = wp.compose;
const {withSelect, withDispatch} = wp.data;
const {PluginDocumentSettingPanel} = wp.editPost;
//import {PluginDocumentSettingPanel} from '@wordpress/edit-post';
const {Button, DateTimePicker, Popover, ToggleControl, TextControl, PanelRow} = wp.components;
//import {Button, DateTimePicker, Popover, ToggleControl, TextControl, PanelRow} from '@wordpress/components';
const {useState} = wp.element;
import * as dayjs from 'dayjs';

const Alphynweb_Event_End_Date_Meta_Fields = ({ postType, postMeta, setPostMeta }) => {
    if (postType !== 'aw-calendar-events')
        return null; // Only show for aw-calendar-events post type

    const [date, setDate] = useState(new Date());

    const [isPopoverVisible, setIsPopoverVisible] = useState(false);

    const toggleIsPopoverVisible = () => {
        setIsPopoverVisible((state) => !state)
    };

    const togglePopoverButtonText = isPopoverVisible ? "Done" : "Set end time and date of event";

    const storedDate = postMeta._event_end_date ? postMeta._event_end_date : date;

    const onUpdateDateTime = (newDateTime) => {
        setDate(newDateTime);
        setPostMeta({_event_end_date: newDateTime});
    };

    return(
            <PluginDocumentSettingPanel title={ __('End date and time', 'alphynweb-calendar-events') } icon="edit" initialOpen="false">
                <PanelRow>
                    <Button variant="secondary" onClick={toggleIsPopoverVisible}>
                        {togglePopoverButtonText}
                    </Button>
            
                </PanelRow>
            
                <PanelRow>
                    <TextControl 
                        label="Date"
                        value={dayjs(storedDate).format('DD/MM/YYYY')}
                        />
                </PanelRow>
            
                <PanelRow>
                    <TextControl
                        label="Time"
                        value={dayjs(storedDate).format('h:mm a')}
                        />
                </PanelRow>
            
                { isPopoverVisible &&
                            <Popover>
                                <DateTimePicker
                                    currentDate={storedDate}
                                    label="Date of event"
                                    is12Hour = {true}
                                    onChange ={(newDateTime => onUpdateDateTime(newDateTime))}
                                    />
                            </Popover>
                }            
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
])(Alphynweb_Event_End_Date_Meta_Fields);

