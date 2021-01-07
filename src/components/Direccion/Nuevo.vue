<template>
<h5>Nueva Dirección</h5>
<div class="p-fluid p-grid p-formgrid">
    <div class="p-field p-col-12 p-md-4">
        <label for="basic">Nombre:</label>
        <span class="p-inputnumber p-component  p-inputwrapper-filled p-inputnumber-buttons-stacked">
            <InputNumber v-model="value" :min="0" :max="100" />
                <span class="p-inputnumber-button-group">
                    <button class="p-button p-component p-button-icon-only p-inputnumber-button p-inputnumber-button-up" type="button">
                        <span class="pi pi-angle-up p-button-icon"></span>
                        <span class="p-button-label">&nbsp;</span>
                        <span class="p-ink" style="height: 33px; width: 33px; top: -13.5px; left: 0.734375px;"></span>
                    </button>
                    <button class="p-button p-component p-button-icon-only p-inputnumber-button p-inputnumber-button-down" type="button">
                        <span class="pi pi-angle-down p-button-icon"></span>
                        <span class="p-button-label">&nbsp;</span>
                        <span class="p-ink"></span>
                    </button>
                </span>
        </span>
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="dateformat">Spanish</label>
        <Calendar id="dateformat" v-model="date2" dateFormat="mm-dd-yy" />
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="icon">Icon</label>
        <Calendar id="icon" v-model="date3" :showIcon="true" />
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="minmax">MinMax</label>
        <Calendar id="minmax" v-model="date4" :minDate="minDate" :maxDate="maxDate" :manualInput="false" />
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="disableddays">Disabled Days</label>
        <Calendar id="disableddays" v-model="date5" :disabledDates="invalidDates" :disabledDays="[0,6]" :manualInput="false" />
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="navigators">Navigators</label>
        <Calendar id="navigators" v-model="date6" :monthNavigator="true" :yearNavigator="true" yearRange="2000:2030" />
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="multiple">Multiple</label>
        <Calendar id="multiple" v-model="dates1" selectionMode="multiple" :manualInput="false" />
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="range">Range</label>
        <Calendar id="range" v-model="dates2" selectionMode="range" :manualInput="false" />
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="buttonbar">Button Bar</label>
        <Calendar id="buttonbar" v-model="date7" :showButtonBar="true" />
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="time24">Time / 24h</label>
        <Calendar id="time24" v-model="date8" :showTime="true" :showSeconds="true" />
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="time12">Time / 12h</label>
        <Calendar id="time12" v-model="date9" :timeOnly="true" hourFormat="12" />
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="monthpicker">Month Picker</label>
        <Calendar id="monthpicker" v-model="date10" view="month" dateFormat="mm/yy" :yearNavigator="true" yearRange="2000:2030" />
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="multiplemonths">Multiple Months</label>
        <Calendar id="multiplemonths" v-model="date11" :numberOfMonths="3" />
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="datetemplate">Date Template</label>
        <Calendar id="datetemplate" v-model="date12">
           <template #date="slotProps">
                <strong v-if="slotProps.date.day > 10 && slotProps.date.day < 15" class="special-day">{{slotProps.date.day}}</strong>
                <template v-else>{{slotProps.date.day}}}</template>
            </template>
        </Calendar>
    </div>
    <div class="p-field p-col-12 p-md-4">
        <label for="touchUI">TouchUI</label>
        <Calendar id="touchUI" v-model="date13" :touchUI="true" />
    </div>
</div>
</template>

<script>
</script>

<style>
</style>