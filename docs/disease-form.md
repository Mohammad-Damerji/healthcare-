# Disease form

This document describes what input types should be present in the form and how
the data should be transformed.

This document does not describes the expected design, that is left to the taste
of the developer, and fine tuned by the developement asynchronously.

## Expected input types
- id: gender
  - label: "Gender"
  - type: Dropdown
  - possible values: `['Male', 'Female', 'Other']`
    - These options should be paired values, I leave it up to you what you give 
      as values, but in the resulting datastructure the above listed should be used
- id: age
  - label "Age"
  - type: number input, with minimum set 0 and maximum set 100, allowing franctionals
- id: hypertension
  - label: "Hypertension"
  - type: checkbox
    - boolean values should be transformed to 'Yes' (true) and 'No' (no)
- id: heart_disease
  - label: "Heart disease"
  - type: checkbox
    - boolean values should be transformed to 'Yes' (true) and 'No' (no)
- id: Residence_type
  - label: "Residence type"
  - type: Dropdown
  - possible values: `['Urban', 'Rural']`
     - These options should be paired values, I leave it up to you what you give 
      as values, but in the resulting datastructure the above listed should be used
- id: avg_glucose_level
  - label "Avarage glucose level"
  - type: number input, allowing fractional (real) numbers
- id: bmi
  - label "BMI index"
  - type: number input, allowing fractional (real) numbers
- id: smoking_status
  - label: "Smoking status"
  - type: Dropdown
  - possible values: `['formerly smoked', 'never smoked', 'smokes', 'Unknown']`
     - These options should be paired values, I leave it up to you what you give 
      as values, but in the resulting datastructure the above listed should be used

Have a button with 'Predict' text on which sends the data.

## Data processing

After the button is pressed please create JavaScript object like this:
```js
{
    id: value
}
```
During the API integration I will take care about the rest.