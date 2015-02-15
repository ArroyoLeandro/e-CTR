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
 * Se define todas las medidas de restauración que serán utilizados por el restore_ectr_activity_task
 *
 * @package   mod_ectr
 * @category  backup
 * @copyright 2015 Manuel Fernando & Daniel Felipe
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Estructura para restaurar una intancia e-CTR
 *
 * @package   mod_ectr
 * @category  backup
 * @copyright 2015 Manuel Fernando & Daniel Felipe
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class restore_ectr_activity_structure_step extends restore_activity_structure_step {

    /**
     * Define la estructura de elementos de ruta para ser procesados durante la restauración
     *
     * @return array of {@link restore_path_element}
     */
    protected function define_structure() {

        $paths = array();
        $paths[] = new restore_path_element('ectr', '/activity/ectr');

        // Devolver los  paths envueltos en la estructura de la actividad estándar.
        return $this->prepare_activity_structure($paths);
    }

    /**
     * Procesar la dada restaurar datos de elementos de ruta
     *
     * @param array $data parsed datos de elemento 
     */
    protected function process_ectr($data) {
        global $DB;

        $data = (object)$data;
        $oldid = $data->id;
        $data->course = $this->get_courseid();

        if (empty($data->timecreated)) {
            $data->timecreated = time();
        }

        if (empty($data->timemodified)) {
            $data->timemodified = time();
        }

        if ($data->grade < 0) {
            // Escala encontrada, Obtener el mapeo.
            $data->grade = -($this->get_mappingid('scale', abs($data->grade)));
        }

        // Crear la Intsnacia eCTR
        $newitemid = $DB->insert_record('ectr', $data);
        $this->apply_activity_instance($newitemid);
    }

    /**
     * Acciones posteriores a la ejecución
     */
    protected function after_execute() {
        // Añadir archivos relacionados ectr, no hay necesidad de igualar por itemname (contexto sólo se maneja internamente).
        $this->add_related_files('mod_ectr', 'intro', null);
    }
}
