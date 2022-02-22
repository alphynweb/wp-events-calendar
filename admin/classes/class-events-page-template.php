<?php class EventsPageTemplate
{

    // Unique identifier
    protected $plugin_slug;

    // Reference to instance of this class
    private static $instance;

    // Array of templates that this plugin tracks
    protected $templates;

    private function __construct()
    {
        $this->templates = array();

        // Add a filter in to the attirubtes metabox to inject template in to the cache
        if (version_compare(floatval(get_bloginfo('version')), '4.7', '<')) {

            // wp 4.6 and older
            add_filter(
                'page_attributes_dropdown_pages_args',
                array(
                    $this,
                    'register_project_templates'
                )
            );
        } else {

            // wp 4.7 upwards
            add_filter(
                'theme_page_templates',
                array(
                    $this,
                    'add_new_template'
                )
            );
        }

        // Add filter tp the save post to inject our template in to the page cache
        add_filter(
            'wp_insert_post_data',
            array(
                $this,
                'register_project_templates'
            )
        );

        // Add a filter to the template include to determine if the page has out template assigned to it and return its path
        add_filter(
            'template_include',
            array(
                $this,
                'view_project_template'
            )
        );

        // add the templates to this array
        $this->templates = array(
            '../../public/templates/alphynweb-events-calendar-template.php' => 'Alphynweb events calendar template'
        );
    }

    // Add templates to template dropdown - Wp 4.7+
    public function add_new_template($posts_templates) {
        $posts_templates = array_merge($posts_templates, $this->templates);
        return $posts_templates;
    }

    public static function get_instance()
    {
        if (null == self::$instance) {
            self::$instance = new EventsPageTemplate();
        }

        return self::$instance;
    }

    public function register_project_templates($atts)
    {
        // Create the key used for the theme's cache
        $cache_key = 'page-templates-' . md5(get_theme_root() . '/' . get_stylesheet());

        // Retrieve the cache list - if it doesn't exists or it's empty, prepare an array
        $templates = wp_get_theme()->get_page_templates();
        if (empty($templates)) {
            $templates = array();
        }

        // New cache therefore remove the old one
        wp_cache_delete($cache_key, 'themes');

        // Add our template to the list of templates by merging our template with the existing array of templates from the cache
        $templates = array_merge($templates, $this->templates);

        // Add the modified cache to allow Wordpress to pick it up for listing available templates
        wp_cache_add($cache_key, $templates, 'themes', 1800);

        return $atts;
    }

    // Checks to see if the template is assigned to the page
    public function view_project_template($template)
    {
        // Get global post
        global $post;

        // Return template if post is empty
        if (!$post) {
            return $template;
        }

        // Return default template if we don't have a custom one defined
        if (!isset($this->templates[get_post_meta(
            $post->ID,
            '_wp_page_template',
            true
        )])) {
            return $template;
        }

        $file = plugin_dir_path(__FILE__) . get_post_meta(
            $post->ID,
            '_wp_page_template',
            true
        );

        // Just to be safe, we check if the file exists first
        if (file_exists($file)) {
            return $file;
        } else {
            echo $file;
        }

        return $template;
    }
}