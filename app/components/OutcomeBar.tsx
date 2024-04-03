export const OutcomeBar = () => (
  <div className="flex space-x-1">
    <div className="flex items-center w-full h-8 px-2 bg-surface-success-accent-1 rounded-s-8">
      <p className="w-full uppercase text-text-success-em">Yes - 50%</p>
    </div>
    <div className="flex items-center w-full h-8 px-2 bg-surface-danger-accent-1 rounded-e-8">
      <p className="w-full text-right uppercase text-text-danger-em">
        No - 50%
      </p>
    </div>
  </div>
);
