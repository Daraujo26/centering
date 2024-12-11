const Title = () => {
  return (
    <header className="flex flex-col items-center justify-center gap-3 min-h-fit p-4 rounded-lg shadow-md">
      <h1 className="text-4xl text-center font-bold">
        Centering: A Framework for Modeling the Local Coherence of Discourse
      </h1>
      <div className="text-center mt-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-5">
            <p className="text-lg">Barbara J. Grosz - Harvard University</p>
            <p className="text-lg">
              Aravind K. Joshi - University of Pennsylvania
            </p>
          </div>
          <p className="text-lg">
            Scott Weinstein - University of Pennsylvania
          </p>
        </div>
        <p className="mt-4 text-base max-w-2xl">
          <strong>Abstract: </strong> This paper concerns relationships among
          focus of attention, choice of referring expression, and perceived
          coherence of utterances within a discourse segment. It presents a
          framework and initial theory of centering intended to model the local
          component of attentional state. The paper examines interactions
          between local coherence and choice of referring expressions; it argues
          that differences in coherence correspond in part to the inference
          demands made by different types of referring expressions, given a
          particular attentional state. It demonstrates that the attentional
          state properties modeled by centering can account for these
          differences.
        </p>
      </div>
    </header>
  );
};

export default Title;
