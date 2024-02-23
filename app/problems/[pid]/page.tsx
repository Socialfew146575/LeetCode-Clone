import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { twoSum } from "@/utils/problems/two-sum";

import React from "react";

type ProblemPageProps = {
  params: {
    pid: string;
  };
};

const ProblemPage: React.FC<ProblemPageProps> = ({
  params,
}: {
  params: { pid: string };
}) => {
  const { pid } = params;

  const problem = problems[pid];

  problem.handlerFunction = problem.handlerFunction.toString();

  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </div>
  );
};

export async function generateStaticParams() {
  const paths = Object.keys(problems).map((key) => {
    pid: key;
  });

  return paths;
}

export default ProblemPage;
