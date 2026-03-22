import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import '@/assets/styles/main.css'

import Carousel from 'primevue/carousel'
import AutoComplete from 'primevue/autocomplete'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'
import AnimateOnScroll from 'primevue/animateonscroll'
import Password from 'primevue/password'
import RadioButton from 'primevue/radiobutton'
import Toast from 'primevue/toast'
import Message from 'primevue/message'
import InputMask from 'primevue/inputmask'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import StepItem from 'primevue/stepitem'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Textarea from 'primevue/textarea'
import ToggleButton from 'primevue/togglebutton'
import MultiSelect from 'primevue/multiselect'
import InputOtp from 'primevue/inputotp'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import FloatLabel from 'primevue/floatlabel'
import ProgressSpinner from 'primevue/progressspinner'
import ToggleSwitch from 'primevue/toggleswitch'
import DataView from 'primevue/dataview'
import Skeleton from 'primevue/skeleton'
import Paginator from 'primevue/paginator'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Panel from 'primevue/panel'
import Listbox from 'primevue/listbox'
import KeyFilter from 'primevue/keyfilter'
import DynamicDialog from 'primevue/dynamicdialog'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import Card from 'primevue/card'
import FileUpload from 'primevue/fileupload'
import Menu from 'primevue/menu'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Image from 'primevue/image'
import ScrollPanel from 'primevue/scrollpanel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tooltip from 'primevue/tooltip'
import ColorPicker from 'primevue/colorpicker'
import Tag from 'primevue/tag'
import Popover from 'primevue/popover'
import SelectButton from 'primevue/selectbutton'
import Avatar from 'primevue/avatar'
import Galleria from 'primevue/galleria'
import MegaMenu from 'primevue/megamenu'
import Menubar from 'primevue/menubar'
import Drawer from 'primevue/drawer'

const app = createApp(App)

app.component('Menubar', Menubar)
app.component('MegaMenu', MegaMenu)
app.component('Galleria', Galleria)
app.component('Avatar', Avatar)
app.component('SelectButton', SelectButton)
app.component('Menu', Menu)
app.component('Listbox', Listbox)
app.component('Accordion', Accordion)
app.component('AccordionPanel', AccordionPanel)
app.component('AccordionHeader', AccordionHeader)
app.component('AccordionContent', AccordionContent)
app.component('Popover', Popover)
app.component('Card', Card)
app.component('Tag', Tag)
app.component('ColorPicker', ColorPicker)
app.component('Carousel', Carousel)
app.component('Image', Image)
app.component('Paginator', Paginator)
app.component('Tabs', Tabs)
app.component('TabList', TabList)
app.component('Panel', Panel)
app.component('Tab', Tab)
app.component('TabPanels', TabPanels)
app.component('TabPanel', TabPanel)
app.component('ScrollPanel', ScrollPanel)
app.component('FileUpload', FileUpload)
app.component('Skeleton', Skeleton)
app.component('DataView', DataView)
app.component('AutoComplete', AutoComplete)
app.component('ToggleSwitch', ToggleSwitch)
app.component('ProgressSpinner', ProgressSpinner)
app.component('FloatLabel', FloatLabel)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputOtp', InputOtp)
app.component('MultiSelect', MultiSelect)
app.component('ToggleButton', ToggleButton)
app.component('Textarea', Textarea)
app.component('Stepper', Stepper)
app.component('StepList', StepList)
app.component('StepPanels', StepPanels)
app.component('StepItem', StepItem)
app.component('Step', Step)
app.component('StepPanel', StepPanel)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('InputMask', InputMask)
app.component('Message', Message)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Select', Select)
app.component('Checkbox', Checkbox)
app.component('DatePicker', DatePicker)
app.component('Button', Button)
app.component('Password', Password)
app.component('RadioButton', RadioButton)
app.component('Toast', Toast)
app.component('DynamicDialog', DynamicDialog)
app.component('Dialog', Dialog)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Drawer', Drawer)

app.use(ToastService)
app.use(DialogService)
app.use(ConfirmationService)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: false || 'none' },
  },
})
app.use(createPinia())
app.use(router)

app.mount('#app')
