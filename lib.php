<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Biblioteca de interfaz de funciones y constantes para ectr módulo
 *
 * Todas las funciones básicas de Moodle, necesarios para que el módulo pueda,
 * trabajar integrado en Moodle deben colocarse aquí.
 * Todos las funciones específicas de ectr, necesarias para implementar toda la 
 * lógica del módulo, deben ir a locallib.php. 
 * Esto le ayudará a ahorrar algo de memoria cuando
 * Moodle está realizando acciones en todos los módulos.
 *
 * @package    mod_ectr
 * @copyright  2015 Manuel Fernando & Daniel Felipe
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Moodle core API
 */

/**
 * Devuelve la información sobre si el módulo soporta una característica.
 *
 * @see plugin_supports() in lib/moodlelib.php
 * @param string $feature FEATURE_xx constante para la función solicitada
 * @return mixed true si admite la función, null si no la conoce
 */
function ectr_supports($feature) {
    switch($feature) {
        case FEATURE_MOD_INTRO:
            return true;
        case FEATURE_SHOW_DESCRIPTION:
            return true;
        default:
            return null;
    }
}

/**
 * Guarda una nueva instancia de los ectr en la base de datos
 *
 * Dado un objeto que contiene todos los datos necesarios,
 * (Definida por la forma en mod_form.php) esta función creará una nueva instancia, 
 * y devolver el número de identificación de la nueva instancia.
 *
 * @param object $webrtc An object from the form in mod_form.php
 * @param mod_ectr_mod_form $mform
 * @return int The id of the newly inserted ectr record
 */
function ectr_add_instance(stdClass $webrtc, mod_ectr_mod_form $mform = null) {
    global $DB;

    $webrtc->timecreated = time();

    return $DB->insert_record('ectr', $webrtc);
}

/**
 * Actualiza una instancia de ECTR en la base de datos
 *
 * Dado un objeto que contiene todos los datos necesarios, 
 * (definida por la forma en mod_form.php) esta función actualizará,
 * una instancia existente con datos nuevos.
 *
 * @param object $webrtc Un objeto del form en mod_form.php
 * @param mod_ectr_mod_form $mform
 * @return boolean Success/Fail
 */
function ectr_update_instance(stdClass $webrtc, mod_ectr_mod_form $mform = null) {
    global $DB;

    $webrtc->timemodified = time();
    $webrtc->id = $webrtc->instance;

    return $DB->update_record('ectr', $webrtc);
}

/**
 * Elimina una instancia de la ECTR de la base de datos
 *
 * Dado un ID de una instancia de este módulo, 
 * esta función eliminará permanentemente la instancia y cualquier dato que depende de él.
 *
 * @param int $id Id de la instancia de módulo
 * @return boolean Success/Failure
 */
function ectr_delete_instance($id) {
    global $DB;

    if (! $webrtc = $DB->get_record('ectr', array('id' => $id))) {
        return false;
    }

    $DB->delete_records('ectr', array('id' => $webrtc->id));

    return true;
}

/**
 * Devuelve un pequeño objeto con información de resumen
 * sobre lo que un usuario ha hecho con un caso particular dado de este módulo
 * Se utiliza para los informes de actividad de los usuarios.
 * $return->time = tiempo el momento en que lo hizo
 * $return->info = una breve descripción de texto
 *
 * @return stdClass|null
 */
function ectr_user_outline($course, $user, $mod, $webrtc) {

    $return = new stdClass();
    $return->time = 0;
    $return->info = '';
    return $return;
}

/**
 * Imprime una representación detallada de lo que un usuario ha hecho
 * con un caso particular dado de este módulo, por los informes de actividad del usuario.
 *
 * @param stdClass $course campo del curso registrado
 * @param stdClass $user el registro del usuario para el que estamos generando informe
 * @param cm_info $mod info del modulo del curso
 * @param stdClass $webrtc registro de la instancia del modulo
 * @return void, se supone que directamente a echp 
 */
function ectr_user_complete($course, $user, $mod, $webrtc) {
}

/**
 * Dado un curso y un tiempo, este módulo debe encontrar actividad reciente,
 * que se ha producido en las actividades ECTR e imprimirlo.
 * Devuelce true si no había salida, o false si es que no había ninguno.
 * 
 * @return boolean
 */
function ectr_print_recent_activity($course, $viewfullnames, $timestart) {
    return false;  // True si nada se imprimió, de lo contrario false.
}

/**
 * Prepara los datos para recent activity
 *  
 * Esta función devuelve, para rellenar la matriz pasada con "registros de actividad" personalizados. Estos registros se prestan a través de HTML
 * This callback function is supposed to populate the passed array with
 * custom activity records. These records are then rendered into HTML via
 * {@link ectr_print_recent_mod_activity()}.
 *
 * @param array $activities sequentially indexed array of objects with the 'cmid' property
 * @param int $index the index in the $activities to use for the next record
 * @param int $timestart append activity since this time
 * @param int $courseid the id of the course we produce the report for
 * @param int $cmid course module id
 * @param int $userid check for a particular user's activity only, defaults to 0 (all users)
 * @param int $groupid check for a particular group's activity only, defaults to 0 (all groups)
 * @return void adds items into $activities and increases $index
 */
function ectr_get_recent_mod_activity(&$activities, &$index, $timestart, $courseid, $cmid, $userid=0, $groupid=0) {
}

/**
 * Prints single activity item prepared by {@see ectr_get_recent_mod_activity()}
 *
 * @return void
 */
function ectr_print_recent_mod_activity($activity, $courseid, $detail, $modnames, $viewfullnames) {
}

/**
 * Function to be run periodically according to the moodle cron
 * This function searches for things that need to be done, such
 * as sending out mail, toggling flags etc ...
 *
 * @return boolean
 * @todo Finish documenting this function
 **/
function ectr_cron () {
    return true;
}

/**
 * Returns all other caps used in the module
 *
 * @example return array('moodle/site:accessallgroups');
 * @return array
 */
function ectr_get_extra_capabilities() {
    return array();
}

/**
 * Gradebook API                                                              //
 */

/**
 * Is a given scale used by the instance of webrtc?
 *
 * This function returns if a scale is being used by one webrtc
 * if it has support for grading and scales. Commented code should be
 * modified if necessary. See forum, glossary or journal modules
 * as reference.
 *
 * @param int $webrtcid ID of an instance of this module
 * @return bool true if the scale is used by the given webrtc instance
 */
function ectr_scale_used($webrtcid, $scaleid) {
    global $DB;

    if ($scaleid and $DB->record_exists('ectr', array('id' => $webrtcid, 'grade' => -$scaleid))) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if scale is being used by any instance of webrtc.
 *
 * This is used to find out if scale used anywhere.
 *
 * @param $scaleid int
 * @return boolean true if the scale is used by any webrtc instance
 */
function ectr_scale_used_anywhere($scaleid) {
    global $DB;

    if ($scaleid and $DB->record_exists('ectr', array('grade' => -$scaleid))) {
        return true;
    } else {
        return false;
    }
}

/**
 * Creates or updates grade item for the give webrtc instance
 *
 * Needed by grade_update_mod_grades() in lib/gradelib.php
 *
 * @param stdClass $webrtc instance object with extra cmidnumber and modname property
 * @param mixed optional array/object of grade(s); 'reset' means reset grades in gradebook
 * @return void
 */
function ectr_grade_item_update(stdClass $webrtc, $grades=null) {
    global $CFG;
    require_once($CFG->libdir.'/gradelib.php');

    $item = array();
    $item['itemname'] = clean_param($webrtc->name, PARAM_NOTAGS);
    $item['gradetype'] = GRADE_TYPE_VALUE;
    $item['grademax']  = $webrtc->grade;
    $item['grademin']  = 0;

    grade_update('mod/ectr', $webrtc->course, 'mod', 'ectr', $webrtc->id, 0, null, $item);
}

/**
 * Update webrtc grades in the gradebook
 *
 * Needed by grade_update_mod_grades() in lib/gradelib.php
 *
 * @param stdClass $webrtc instance object with extra cmidnumber and modname property
 * @param int $userid update grade of specific user only, 0 means all participants
 * @return void
 */
function ectr_update_grades(stdClass $webrtc, $userid = 0) {
    global $CFG, $DB;
    require_once($CFG->libdir.'/gradelib.php');

    $grades = array(); // Populate array of grade objects indexed by userid.

    grade_update('mod/ectr', $webrtc->course, 'mod', 'ectr', $webrtc->id, 0, $grades);
}

/**
 * File API                                                                   //
 */

/**
 * Returns the lists of all browsable file areas within the given module context
 *
 * The file area 'intro' for the activity introduction field is added automatically
 * by {@link file_browser::get_file_info_context_module()}
 *
 * @param stdClass $course
 * @param stdClass $cm
 * @param stdClass $context
 * @return array of [(string)filearea] => (string)description
 */
function ectr_get_file_areas($course, $cm, $context) {
    return array();
}

/**
 * File browsing support for webrtc file areas
 *
 * @package mod_webrtc
 * @category files
 *
 * @param file_browser $browser
 * @param array $areas
 * @param stdClass $course
 * @param stdClass $cm
 * @param stdClass $context
 * @param string $filearea
 * @param int $itemid
 * @param string $filepath
 * @param string $filename
 * @return file_info instance or null if not found
 */
function ectr_get_file_info($browser, $areas, $course, $cm, $context, $filearea, $itemid, $filepath, $filename) {
    return null;
}

/**
 * Serves the files from the webrtc file areas
 *
 * @package mod_webrtc
 * @category files
 *
 * @param stdClass $course the course object
 * @param stdClass $cm the course module object
 * @param stdClass $context the webrtc's context
 * @param string $filearea the name of the file area
 * @param array $args extra arguments (itemid, path)
 * @param bool $forcedownload whether or not force download
 * @param array $options additional options affecting the file serving
 */
function ectr_pluginfile($course, $cm, $context, $filearea, array $args, $forcedownload, array $options=array()) {
    global $DB, $CFG;

    if ($context->contextlevel != CONTEXT_MODULE) {
        send_file_not_found();
    }

    require_login($course, true, $cm);

    send_file_not_found();
}

/**
 * Navigation API                                                             //
 */

/**
 * Extends the global navigation tree by adding webrtc nodes if there is a relevant content
 *
 * This can be called by an AJAX request so do not rely on $PAGE as it might not be set up properly.
 *
 * @param navigation_node $navref An object representing the navigation tree node of the webrtc module instance
 * @param stdClass $course
 * @param stdClass $module
 * @param cm_info $cm
 */
function ectr_extend_navigation(navigation_node $navref, stdclass $course, stdclass $module, cm_info $cm) {
}

/**
 * Extends the settings navigation with the webrtc settings
 *
 * This function is called when the context for the page is a webrtc module. This is not called by AJAX
 * so it is safe to rely on the $PAGE.
 *
 * @param settings_navigation $settingsnav {@link settings_navigation}
 * @param navigation_node $webrtcnode {@link navigation_node}
 */
function ectr_extend_settings_navigation(settings_navigation $settingsnav, navigation_node $webrtcnode=null) {
}
