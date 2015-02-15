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
 * Defines backup_ectr_activity_task class
 *
 * @package   mod_ectr
 * @category  backup
 * @copyright 2015 Manuel Fernando & Daniel Felipe
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

require_once($CFG->dirroot . '/mod/ectr/backup/moodle2/backup_ectr_stepslib.php');

/**
 * Proporciona los pasos para realizar una copia de seguridad completa de la instancia e-CTR
 *
 * @package   mod_ectr
 * @category  backup
 * @copyright 2015 Manuel Fernando & Daniel Felipe
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class backup_ectr_activity_task extends backup_activity_task {

    /**
     * No hay parámetros específicos para esta actividad
     */
    protected function define_my_settings() {
    }

    /**
     * Define un paso de copia de seguridad para almacenar los datos de instancia en el archivo ectr.xml
     */
    protected function define_my_steps() {
        $this->add_step(new backup_ectr_activity_structure_step('ectr_structure', 'ectr.xml'));
    }

    /**
     * Codifica las URLs a los scripts index.php y view.php
     *
     * @param string $content en un poco de HTML que eventualmente contiene vínculos a otros scripts de instancia de actividad
     * @return cadena al contenido con las direcciones URL codificado
     */
    static public function encode_content_links($content) {
        global $CFG;

        $base = preg_quote($CFG->wwwroot, '/');

        // Enlace a la lista de ectrs.
        $search = '/('.$base.'\/mod\/ectr\/index.php\?id\=)([0-9]+)/';
        $content = preg_replace($search, '$@ectrINDEX*$2@$', $content);

        // Enlace a ectr vista por moduleid.
        $search = '/('.$base.'\/mod\/ectr\/view.php\?id\=)([0-9]+)/';
        $content = preg_replace($search, '$@ectrVIEWBYID*$2@$', $content);

        return $content;
    }
}
