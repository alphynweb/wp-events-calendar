const {__} = wp.i18n;
const {Fragment} = wp.element;
const {compose} = wp.compose;
const {withSelect, withDispatch} = wp.data;
const {PluginDocumentSettingPanel} = wp.editPost;
const {Button, DateTimePicker, Popover, PanelRow} = wp.components;
const {useState} = wp.element;

// js date manipulation library
import * as dayjs from 'dayjs';

const Alphynweb_Event_Date_Meta_Fields = ({ postType, postMeta, setPostMeta }) => {
    // If wrong post type then return
    if (postType !== 'aw-calendar-events') {
        return null;
    }

    // Event date state
    const [eventDateTime, setEventDateTime] = useState(new Date());
    // Popover states
    const [isStartPopoverVisible, setIsStartPopoverVisible] = useState(false);
    const [isEndPopoverVisible, setIsEndPopoverVisible] = useState(false);

    // Toggle popover visibilities
    const toggleIsPopoverVisible = (popoverName) => {
        switch (popoverName) {
            case "start":
                setIsStartPopoverVisible((state) => !state);
                break;
            case "end":
                setIsEndPopoverVisible((state) => !state);
                break;
        }
    };

    // Text to display in popover toggle buttons
    const startButtonText = isStartPopoverVisible ? "Done" : "Set start time and date of event";
    const endButtonText = isEndPopoverVisible ? "Done" : "Set end time and date of event";

    // If dates are already in post meta use them, otherwise use current date
    const storedStartDate = postMeta._event_start_date ? postMeta._event_start_date : eventDateTime;
    const storedEndDate = postMeta._event_end_date ? postMeta._event_end_date : eventDateTime;

    // Update date in meta data (metaField to update, value to update to)
    const onUpdateDateTime = (metaField, newDateTime) => {
        setEventDateTime(newDateTime);
        setPostMeta({[metaField]: newDateTime});
    };

    return(
            <Fragment>
                <PluginDocumentSettingPanel 
                    title={__('Event start date and time', 'alphynweb-calendar-events')} 
                    icon="edit" 
                    initialOpen="true">
            
                    <PanelRow>
                        <Button variant="secondary" onClick={toggleIsPopoverVisible('start')}>
                            {startButtonText}
                        </Button>
            
                    </PanelRow>
            
                    <PanelRow>
                        <TextControl 
                            label="Date"
                            value={dayjs(storedStartDate).format('DD/MM/YYYY')}
                            />
                    </PanelRow>
            
                    <PanelRow>
                        <TextControl
                            label="Time"
                            value={dayjs(storedStartDate).format('h:mm a')}
                            />
                    </PanelRow>
            
                    { isStartPopoverVisible &&
                            <Popover>
                                <DateTimePicker
                                    currentDate={storedStartDate}
                                    label="Date of event"
                                    is12Hour = {true}
                                    onChange ={newDateTime => onUpdateDateTime('_event_start_date', newDateTime)}
                                    />
                            </Popover>
                    }      
            
                </PluginDocumentSettingPanel>      
            
                <PluginDocumentSettingPanel 
                    title={__('Event end date and time', 'alphynweb-calendar-events')} 
                    icon="edit" 
                    initialOpen="true">
            
                    <PanelRow>
                        <Button variant="secondary" onClick={toggleIsPopoverVisible('end')}>
                            {endButtonText}
                        </Button>
            
                    </PanelRow>
            
                    <PanelRow>
                        <TextControl 
                            label="Date"
                            value={dayjs(storedEndDate).format('DD/MM/YYYY')}
                            />
                    </PanelRow>
            
                    <PanelRow>
                        <TextControl
                            label="Time"
                            value={dayjs(storedEndDate).format('h:mm a')}
                            />
                    </PanelRow>
            
                    { isEndPopoverVisible &&
                            <Popover>
                                <DateTimePicker
                                    currentDate={storedEndDate}
                                    label="Date of event"
                                    is12Hour = {true}
                                    onChange ={newDateTime => onUpdateDateTime('_event_end_date', newDateTime)}
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

