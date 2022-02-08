const {__} = wp.i18n;
const {Fragment} = wp.element;
const {compose} = wp.compose;
const {withSelect, withDispatch} = wp.data;
const {PluginDocumentSettingPanel} = wp.editPost;
const {Button, DateTimePicker, Popover, ToggleControl, TextControl, PanelRow} = wp.components;
const {useState} = wp.element;

import * as dayjs from 'dayjs';

const Alphynweb_Event_Date_Meta_Fields = ({ postType, postMeta, setPostMeta }) => {
    if (postType !== 'aw-calendar-events')
        return null; // Only show for aw-calendar-events post type

    // [] first argument (date) = current value of state
    // [] second argument (setDate) = function to update state with new value
    // useState() - one argument in brackets = inital value of state (new Date())
    const [date, setDate] = useState(new Date());

    // [] first argument (isPopoverVisible) = current value of state
    // [] second argument (setIsPopoverVisible) = function to update state with new value
    // useState() - one argument in brackets = inital value of state (false in this case)
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);

    // Toggle popver visiblity by using setIsPopoverVisible function to alter state of isPopoverVisible
    const toggleIsPopoverVisible = () => {
        setIsPopoverVisible((state) => !state);
    };

    // Text to display in button
    const buttonText = isPopoverVisible ? "Done" : "Set time and date of event";

    // If date is already in post meta use that, otherwise use current date
    const storedDate = postMeta._event_start_date ? postMeta._event_start_date : date;

    const onUpdateDateTime = (metaField, newDateTime) => {
        setDate(newDateTime);
        setPostMeta({[metaField]: newDateTime});
    };

    return(
            <Fragment>
                <PluginDocumentSettingPanel 
                    title={__('Event start date and time', 'alphynweb-calendar-events')} 
                    icon="edit" 
                    initialOpen="true">
                    
                    <PanelRow>
                        <Button variant="secondary" onClick={toggleIsPopoverVisible}>
                            {buttonText}
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
                                    onChange ={(newDateTime) => onUpdateDateTime('_event_start_date', newDateTime))}
                                    />
                            </Popover>
                    }      
                    
                </PluginDocumentSettingPanel>                                                            
            </Fragment>
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
])(Alphynweb_Event_Date_Meta_Fields);

