'use client';

import { Button, Form, Input, Label, Modal, TextArea, TextField } from '@heroui/react';
import { ReactNode, useState } from 'react';

interface SlotProps {
  children: ReactNode;
}

export const FeedbackModal = ({ children }: SlotProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal>
      {children}

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-90">
            {({ close }) => {
              const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data: Record<string, string> = {};

                // Convert FormData to plain object
                formData.forEach((value, key) => {
                  data[key] = value.toString();
                });

                data.source = 'fightcore-web';

                const request = new Request('https://feedback.fightcore.gg/feedback-items', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });

                setLoading(true);

                fetch(request).then(() => close());
              };

              return (
                <>
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Heading>Give us feedback</Modal.Heading>
                  </Modal.Header>
                  <Form onSubmit={onSubmit}>
                    <Modal.Body>
                      <div className="flex flex-col gap-3">
                        <div>
                          Encountered an issue or just want to let us know what you think? We'd love to know what you
                          think of Fightcore.
                        </div>
                        <TextField name="message" isRequired>
                          <Label>Feedback message</Label>
                          <TextArea placeholder="Enter feedback here" rows={6} style={{ resize: 'vertical' }} />
                        </TextField>

                        <TextField name="contactDetails">
                          <Label>Contact information</Label>
                          <span className="text-sm">
                            This is completely optional and will not be shared with anyone outside of Fightcore.
                          </span>
                          <Input placeholder="Describe how we can contact you" />
                        </TextField>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button isDisabled={loading} className="w-full" type="submit">
                        Submit
                      </Button>
                    </Modal.Footer>
                  </Form>
                </>
              );
            }}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
