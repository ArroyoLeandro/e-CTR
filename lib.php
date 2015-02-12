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
 * Guarda una nueva instancia de e-CTR en la base de datos
 *
 * Dado un objeto que contiene todos los datos necesarios,
 * (Definida por la forma en mod_form.php) esta función creará una nueva instancia, 
 * y devolver el número de identificación de la nueva instancia.
 *
 * @param object $webrtc An object from the form in mod_form.php
 * @param mod_ectr_mod_form $mform
 * @return int el id del registro e-CTR recien guardado
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
 * @param objeto $webrtc Un objeto del form en mod_form.php
 * @param mod_ectr_mod_form $mform
 * @return boolean Exito/Falla
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
 * @return boolean Exito/Falla
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
 * Dado un curso y un tiempo, este módulo debe encontrar la actividad reciente,
 * que se ha producido en las actividades e-CTR e imprimirlo.
 * Devuelve true si no hay salida, o false si es que no había ninguno.
 * 
 * @return boolean
 */
function ectr_print_recent_activity($course, $viewfullnames, $timestart) {
    return false;  // True si nada se imprimió, false si sucede lo contrario.
}

/**
 * Prepara los datos para recent activity
 *  
 * Esta función devuelve, para rellenar la matriz pasada con "registros de actividad" personalizados. Estos registros se prestan a través de HTML
 * Esta función devuelve la llamada que es popular en la matriz pasada con
 * registros de actividad personalizada. Estos registros se muestran a través de HTML
 * {@link ectr_print_recent_mod_activity()}.
 *
 * @param array $activities matriz secuencial indexada de objetos con la propiedad 'CMID'
 * @param int $index el index en las $activities a utilizar para el siguiente registro
 * @param int $timestart anexar actividad desde este momento
 * @param int $courseid el id del curso que se requiere en el informe de
 * @param int $cmid course module id
 * @param int $userid comprobar si la actividad de un usuario en particular o solo, por defecto es 0 (todos los usuarios)
 * @param int $groupid comprobar la actividad de un grupo particular o solo, por defecto es 0 (todos los grupos)
 * @return void añade elementos en $activities y aumenta $index
 */
function ectr_get_recent_mod_activity(&$activities, &$index, $timestart, $courseid, $cmid, $userid=0, $groupid=0) {
}

/**
 * Imprime solo las actividades separada por {@see ectr_get_recent_mod_activity()}
 *
 * @return void
 */
function ectr_print_recent_mod_activity($activity, $courseid, $detail, $modnames, $viewfullnames) {
}

/**
* Función para ejecutarse periódicamente según el cron moodle
  * Esta función busca de cosas que hay que hacer, por ejemplo
  * Como el envío de correo electrónico, alternar banderas, etc ...
 *
 * @return boolean
 * @todo Fin de la documetacion de esta funcion
 **/
function ectr_cron () {
    return true;
}

/**
 * Devuelve todas las demás tapas usadas en el módulo
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
 * Es una escala dada utilizado por la instancia de WebRTC?
 *
 * Esta función devuelve si la escala está siendo utilizado por una WebRTC
 * Si tiene soporte para la clasificación y escalas. Código comentado debe ser
 * Modificado si es necesario. Ver módulos foro, glosario o revistas
 * Como referencia.
 *
 * @param int $webrtcid ID de una instancia de este modulo
 * @return bool true si la escala es utilizada por la instancia WebRTC
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
 * Comprueba si la escala está siendo utilizado por cualquier instancia de WebRTC.
 *
 * Esto se utiliza para averiguar si la escala utilizada en cualquier lugar.
 *
 * @param $scaleid int
 * @return boolean true si la escala es utilizada por cualquier instancia WebRTC.
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
 * Crea o actualiza los elementos de grado para la instancia que dará WebRTC.
 *
 * Necesaria por grade_update_mod_grades() in lib/gradelib.php
 *
 * @param stdClass $webrtc instancia con objeto extra cmidnumber y modname como propiedad
 * @param mixed opcional array/object de grado(s); 'reset' significa grados de restablecimiento en libro de calificaciones
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
 * Actualización grados WebRTC en el libro de calificaciones
 *
 * Necesario por grade_update_mod_grades() in lib/gradelib.php
 *
 * @param stdClass $webrtc instancia del objeto extra con cmidnumber y modname como propiedad
 * @param int $userid actualización grado de usuario específico sólo, 0 significa que todos los participantes
 * @return void
 */
function ectr_update_grades(stdClass $webrtc, $userid = 0) {
    global $CFG, $DB;
    require_once($CFG->libdir.'/gradelib.php');

    $grades = array(); // Rellenar la matriz de objetos de grados indexados por userid.

    grade_update('mod/ectr', $webrtc->course, 'mod', 'ectr', $webrtc->id, 0, $grades);
}

/**
 * Archivo API                                                                   //
 */

/**
 * Devuelve la lista de todas las áreas de archivos navegables dentro del contexto determinado módulo.
 *
 * El area del archivo 'intro' para el campo de actividad de introducción se añade automáticamente.
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
 * Apoyo para la consulta de archivos para las áreas de archivos WebRTC
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
 * @return file_info si no se encuentra la instalacia o nula
 */
function ectr_get_file_info($browser, $areas, $course, $cm, $context, $filearea, $itemid, $filepath, $filename) {
    return null;
}

/**
 * Sirve a los archivos de las áreas de archivos WebRTC
 *
 * @package mod_webrtc
 * @category archivos
 *
 * @param stdClass $course el objeto del curso
 * @param stdClass $cm el objeto módulo del curso
 * @param stdClass $context contexto de la WebRTC
 * @param string $filearea el nombre de la zona de archivos
 * @param array $args argumentos extra (itemid, path)
 * @param bool $forcedownload si o no forzar la descarga
 * @param array $options opciones adicionales que afectan el servicio de archivos
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
 * Navegacion API                                                             //
 */

/**
 * Extiende el árbol de navegación global añadiendo nodos WebRTC si hay un contenido relevante.
 *
 * Esto puede ser llamado por una petición AJAX así que no confíe en $PAGE ya que no podría estar configurado correctamente..
 *
 * @param navigation_node $navref Un objeto que representa el nodo del árbol de navegación de la instancia de módulo WebRTC
 * @param stdClass $course
 * @param stdClass $module
 * @param cm_info $cm
 */
function ectr_extend_navigation(navigation_node $navref, stdclass $course, stdclass $module, cm_info $cm) {
}

/**
 * Extiende la navegación ajustes con los ajustes WebRTC
 *
 * Esta función se llama cuando el contexto de la página es un módulo WebRTC. Esto no es llamado por AJAX
 * Lo que es muy seguro para confiar en $PAGE.
 *
 * @param settings_navigation $settingsnav {@link settings_navigation}
 * @param navigation_node $webrtcnode {@link navigation_node}
 */
function ectr_extend_settings_navigation(settings_navigation $settingsnav, navigation_node $webrtcnode=null) {
}
