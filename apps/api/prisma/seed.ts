import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const problems = [
    {
      slug: 'two-sum-fast',
      title: 'Two Sum Fast',
      difficulty: 'EASY',
      tags: ['array', 'hash-map'],
      description: 'Given an array of integers, return the indices of the two numbers that add up to a specific target.',
      inputFormat: 'n (1 <= n <= 10^5) followed by n integers and the target value',
      outputFormat: 'Indices i and j such that nums[i] + nums[j] = target',
      sampleTests: [
        {
          input: '4\n2 7 11 15\n9',
          output: '0 1',
          explanation: '2 + 7 = 9'
        }
      ],
      testCases: {
        language: 'typescript',
        functionName: 'solve',
        tests: [
          {
            input: {nums: [2, 7, 11, 15], target: 9},
            expected: [0, 1]
          },
          {
            input: {nums: [3, 2, 4], target: 6},
            expected: [1, 2]
          },
          {
            input: {nums: [3, 3], target: 6},
            expected: [0, 1]
          }
        ]
      }
    }
  ];

  for (const problem of problems) {
    await prisma.problem.upsert({
      where: {slug: problem.slug},
      update: {},
      create: problem
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
