import React from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { label: 'Sign In', completed: step1 },
    { label: 'Shipping', completed: step2 },
    { label: 'Payment', completed: step3 },
    { label: 'Place Order', completed: step4 },
  ];

  return (
    <Box sx={{ width: '100%', my: 3 }}>
      <Stepper activeStep={steps.filter(step => step.completed).length - 1} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label} completed={step.completed}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CheckoutSteps;