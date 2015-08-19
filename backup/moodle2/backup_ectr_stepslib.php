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
 * Definir todos los pasos de copia de seguridad que serán utilizados por el backup_ectr_activity_task
 *
 * @package   mod_ectr
 * @category  backup
 * @copyright 2015 Manuel Fernando
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

/**
 * Definir la estructura e-CTR completa de copia de seguridad, con archivos e id anotaciones
 *
 * @package   mod_ectr
 * @category  backup
 * @copyright 2015 Manuel Fernando
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class backup_ectr_activity_structure_step extends backup_activity_structure_step {

    /**
     * Define la estructura de seguridad del módulo
     *
     * @return backup_nested_element
     */
    protected function define_structure() {

        // Obtener, saber si estamos incluyendo userinfo.
        $userinfo = $this->get_setting_value('userinfo');

        // Definir el elemento raíz que describe la instancia e-CTR.
        $ectr = new backup_nested_element('ectr', array('id'), array(
            'name', 'intro', 'introformat', 'grade'));

        // Si tuviéramos más elementos, construir el árbol aquí.

        // Definir las fuentes de datos.
        $ectr->set_source_table('ectr', array('id' => backup::VAR_ACTIVITYID));

        // Si nos referimos a otras mesas, queremos anotar la relación
        // Con el elemento annotate_ids() method.

        // Define las anotaciones del archivo (no utilizamos itemid en este ejemplo).
        $ectr->annotate_files('mod_ectr', 'intro', null);

        // Devuelve el elemento raiz (ectr), envuelto en la estructura actividad estándar.
        return $this->prepare_activity_structure($ectr);
    }
}
