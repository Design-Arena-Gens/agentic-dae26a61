import { NextRequest, NextResponse } from 'next/server';

const remediesData = {
  diabetes: [
    { name: 'Bitter Gourd Juice', benefits: 'Lowers blood sugar', usage: 'Drink 30ml daily on empty stomach' },
    { name: 'Fenugreek Seeds', benefits: 'Improves insulin sensitivity', usage: 'Soak overnight, consume in morning' },
    { name: 'Cinnamon', benefits: 'Regulates glucose', usage: '1 tsp daily in warm water' },
  ],
  hypertension: [
    { name: 'Garlic', benefits: 'Reduces blood pressure', usage: '2 cloves daily on empty stomach' },
    { name: 'Ashwagandha', benefits: 'Stress reduction', usage: '500mg twice daily' },
    { name: 'Cardamom', benefits: 'Improves circulation', usage: 'Add to tea or meals' },
  ],
  arthritis: [
    { name: 'Turmeric', benefits: 'Anti-inflammatory', usage: '1 tsp with warm milk' },
    { name: 'Ginger', benefits: 'Pain relief', usage: 'Fresh ginger tea 2x daily' },
    { name: 'Boswellia', benefits: 'Joint support', usage: '300mg daily' },
  ],
  obesity: [
    { name: 'Triphala', benefits: 'Metabolism boost', usage: '1 tsp with warm water before bed' },
    { name: 'Green Tea', benefits: 'Fat burning', usage: '2-3 cups daily' },
    { name: 'Guggul', benefits: 'Cholesterol management', usage: '500mg twice daily' },
  ],
  asthma: [
    { name: 'Tulsi (Holy Basil)', benefits: 'Respiratory support', usage: 'Fresh leaves or tea daily' },
    { name: 'Ginger', benefits: 'Bronchodilator', usage: 'Ginger honey mix 2x daily' },
    { name: 'Black Pepper', benefits: 'Clears airways', usage: 'With honey in warm water' },
  ],
  anxiety: [
    { name: 'Brahmi', benefits: 'Calms nervous system', usage: '300mg daily' },
    { name: 'Ashwagandha', benefits: 'Adaptogen', usage: '500mg twice daily' },
    { name: 'Jatamansi', benefits: 'Sleep & mood', usage: '500mg before bed' },
  ],
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const disease = searchParams.get('disease')?.toLowerCase();

    if (!disease) {
      return NextResponse.json({
        message: 'Available diseases',
        diseases: Object.keys(remediesData),
        allRemedies: remediesData
      });
    }

    const remedies = (remediesData as any)[disease];

    if (!remedies) {
      return NextResponse.json(
        { error: 'Disease not found', availableDiseases: Object.keys(remediesData) },
        { status: 404 }
      );
    }

    return NextResponse.json({ disease, remedies });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
