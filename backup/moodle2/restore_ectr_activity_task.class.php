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
 * Proporciona la clase para restaurar la instancia
 *
 * @package   mod_ectr
 * @category  backup
 * @copyright 2015 Manuel Fernando
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/mod/ectr/backup/moodle2/restore_ectr_stepslib.php');

/**
 * Proporciona todos los ajustes y pasos para realizar una restauración completa de la actividad.
 *
 * @package   mod_ectr
 * @category  backup
 * @copyright 2015 Manuel Fernando
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class restore_ectr_activity_task extends restore_activity_task {

    /**
     * Define (add) entornos particulares de esta actividad pueden tener
     */
    protected function define_my_settings() {
        // No hay ajustes particulares para esta actividad.
    }

    /**
     * Define (add) pasos concretos que puede tener esta actividad
     */
    protected function define_my_steps() {
        // Tenemos sólo un paso de estructura.
        $this->add_step(new restore_ectr_activity_structure_step('ectr_structure', 'ectr.xml'));
    }

    /**
     * Definir el contenido de la actividad que debe ser
      * Procesado por el decodificador del enlace
     */
    static public function define_decode_contents() {
        $contents = array();

        $contents[] = new restore_decode_content('ectr', array('intro'), 'ectr');

        return $contents;
    }

    /**
     * Definir las reglas de decodificación para los enlaces que pertenecen
      * A la actividad a ejecutar por el decodificador enlace
     */
    static public function define_decode_rules() {
        $rules = array();

        $rules[] = new restore_decode_rule('ectrVIEWBYID', '/mod/ectr/view.php?id=$1', 'course_module');
        $rules[] = new restore_decode_rule('ectrINDEX', '/mod/ectr/index.php?id=$1', 'course');

        return $rules;

    }

    /**
     * Definir las reglas de restauración de registro que se aplicarán
     * por el {@link restore_logs_processor} al restaurar
     * ectr logs. Debe de devolver un array
     * of {@link restore_log_rule} objetos
     */
    static public function define_restore_log_rules() {
        $rules = array();

        $rules[] = new restore_log_rule('ectr', 'add', 'view.php?id={course_module}', '{ectr}');
        $rules[] = new restore_log_rule('ectr', 'update', 'view.php?id={course_module}', '{ectr}');
        $rules[] = new restore_log_rule('ectr', 'view', 'view.php?id={course_module}', '{ectr}');

        return $rules;
    }

    /**
     * Definir las reglas de restauración de registro que se aplicarán
     * por el {@link restore_logs_processor} al restaurar
     * course logs. Debe de devolver un array
     * of {@link restore_log_rule} objetos
     *
     * Note this rules are applied when restoring course logs
     * by the restore final task, but are defined here at
     * activity level. All them are rules not linked to any module instance (cmid = 0)
     */
    static public function define_restore_log_rules_for_course() {
        $rules = array();

        $rules[] = new restore_log_rule('ectr', 'view all', 'index.php?id={course}', null);

        return $rules;
    }
}
