import type { ComposerTranslation } from 'vue-i18n'

export const GENDER = {
  MALE: "0",
  FEMALE: "1",
  OTHER: "2",
}

export const GENDER_ARRAYS = (t: ComposerTranslation) => [
  {
    value: GENDER.MALE,
    label: t('customers.gender_male'),
  },
  {
    value: GENDER.FEMALE,
    label: t('customers.gender_female'),
  },
  {
    value: GENDER.OTHER,
    label: t('customers.gender_other'),
  },
]

export const PET_GENDER_ARRAYS = (t: ComposerTranslation) => [
  {
    value: GENDER.MALE,
    label: t('medical.pet_gender_male'),
  },
  {
    value: GENDER.FEMALE,
    label: t('medical.pet_gender_female'),
  },
]
