"use client";

import Button from "./Button";

type ContactFormProps = {
  dict: {
    formTitle: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
  };
};

const inputClass =
  "w-full rounded-[var(--radius)] border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-600/50 transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none";

export default function ContactForm({ dict }: ContactFormProps) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-5"
      noValidate={false}
    >
      <h2 className="text-neutral-900">{dict.formTitle}</h2>

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-neutral-900">
          {dict.name}
        </label>
        <input id="name" type="text" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-neutral-900">
          {dict.email}
        </label>
        <input id="email" type="email" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-neutral-900">
          {dict.subject}
        </label>
        <input id="subject" type="text" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-neutral-900">
          {dict.message}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className={`${inputClass} resize-y min-h-[120px]`}
        />
      </div>

      <Button variant="primary" type="submit">
        {dict.send}
      </Button>
    </form>
  );
}
