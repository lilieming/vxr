// ----------------------------------------------------------------------------------------
// MIT License
// 
// Copyright(c) 2018 Víctor Ávila
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files(the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions :
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// ----------------------------------------------------------------------------------------

layout(std140) uniform Planet
{
  	vec2 elevationMinMax;
};

float inverseLerp(float a, float b, float value)
{
  	return ((value - a) / (b - a));
}

void main()
{     
  	float alpha = inverseLerp(elevationMinMax.x, elevationMinMax.y, length(getPosition()));
  	vec2 biome_uv = vec2(clamp(alpha, 0, 1), clamp(getUV().x, 0.001, 0.999));
  	
  	MaterialInput inputs = initMaterial();

    inputs.baseColor.xyz = sRGBtoLinear(texture(u_tex2d3, biome_uv).xyz);

    inputs.metallic = 0.0;

    inputs.roughness = (alpha > 0.01) ? 1.0 : 0.0;

    inputs.reflectance = 0.0;

#if MAT_HAS_CLEAR_COAT
    inputs.clearCoat = (alpha > 0.01) ? 0.0 : 1.0;
#endif
    setFragmentColor(evaluateMaterial(inputs));
}