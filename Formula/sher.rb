class Sher < Formula
  desc "Instant preview links for your frontend projects"
  homepage "https://sher.sh"
  url "https://registry.npmjs.org/shersh/-/shersh-0.4.9.tgz"
  license "AGPL-3.0"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink libexec/"bin/sher"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/sher --version")
  end
end
