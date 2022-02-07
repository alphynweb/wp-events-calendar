const {__} = wp.i18n;
const {compose} = wp.compose;
const {withSelect, withDispatch} = wp.data;
const {PluginDocumentSettingPanel} = wp.editPost;
const {DateTimePicker, ToggleControl, TextControl, PanelRow} = wp.components;
const {useState} = wp.element;

const Alphynweb_Custom_Post_Meta_Fields = ({ postType, postMeta, setPostMeta }) => {
    if (postType !== 'aw-calendar-events')
        return null; // Only show for aw-calendar-events post type

    const [date, setDate] = useState(new Date());

    return(
            <PluginDocumentSettingPanel title={ __('My Custom Post meta', 'txtdomain') } icon="edit" initialOpen="true">
                <PanelRow>
                    <ToggleControl
                        label={ __('You can toggle me on or off', 'txtdomain') }
                        onChange={ (value) => setPostMeta({_my_custom_bool: value}) }
                        checked={ postMeta._my_custom_bool }
                        />
                </PanelRow>
                <PanelRow>
                    <TextControl
                        label={ __('Write some text, if you like', 'txtdomain') }
                        value={ postMeta._my_custom_text }
                        onChange={ (value) => setPostMeta({_my_custom_text: value}) }
                        />
                </PanelRow>
            
                <PanelRow>
                    <DateTimePicker
                        currentDate={date}
                        label="Date of event"
                        is12Hour = {true}
                        onChange={ (newDate) => setDate(newDate) }
                        />
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

